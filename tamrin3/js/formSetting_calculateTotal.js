// تابعی برای محاسبه مجموع کل نمرات و ضرب نمره در ضریب
function calculateTotal() {
  // دریافت مقدار ستون txt_score از ردیف اول جدول
  var control = $("#grd_grid1").getValue(0, "txt_score");

  // بررسی اینکه control یک آرایه دوبعدی معتبر است
  if (Array.isArray(control) && control.every(arr => Array.isArray(arr))) {
    if (control.length === 0) return; // اگر آرایه خالی بود، تابع را متوقف کن

    var totalSum = 0; // متغیر برای نگهداری مجموع نمرات (بدون ضریب)

    // پیمایش هر ردیف جدول
    for (var j = 0; j < control.length; j++) {
      var score = parseFloat(control[j][3]); // دریافت مقدار نمره (ستون چهارم - ایندکس 3)
      var rate = parseFloat(control[j][4]);  // دریافت مقدار ضریب (ستون پنجم - ایندکس 4)

      // اگر هر دو مقدار عددی معتبر بودند:
      if (!isNaN(score) && !isNaN(rate)) {
        var product = score * rate; // ضرب نمره در ضریب

        control[j][5] = product.toString(); // نتیجه ضرب را در ستون ششم (ایندکس 5) قرار بده

        // قرار دادن مقدار ضرب در جدول (در سلول مربوطه)
        $("#grd_grid1").setValue(product, j + 1, '6');

        // افزودن نمره به مجموع کل نمرات (بدون ضریب)
        totalSum += score;
      }
    }

    // نمایش مجموع نمرات در فیلد txt_total
    $("#txt_total").setValue(totalSum.toString());

    // اگر نیاز باشد، مقدار اصلاح‌شده را مجدد به جدول برگردان
    $("#grd_grid1").setValue(0, "txt_score", control);
  }
}

// اتصال رویداد تغییر مقدار نمره (txt_score) به تابع calculateTotal برای یک ردیف خاص
function bindScoreChange(rowIndex) {
  // گرفتن کنترل سلول نمره از ردیف مورد نظر
  var control = $("#grd_grid1").getControl(rowIndex, "txt_score");

  // پیدا کردن input داخل آن کنترل
  var input = $(control).find("input");

  // اگر input وجود داشت، رویداد change را به تابع calculateTotal متصل کن
  if (input.length) {
    input.off("change").on("change", function () {
      calculateTotal(); // در هنگام تغییر مقدار، تابع محاسبه اجرا شود
    });
  }
}

// گرفتن تعداد ردیف‌های موجود در جدول
var rowCount = $("#grd_grid1").getNumberRows();

// اجرای bindScoreChange برای هر ردیف موجود
for (var i = 1; i <= rowCount; i++) {
  bindScoreChange(i);
}

// اجرای اولیه تابع محاسبه
calculateTotal();

// زمانی که ردیف جدید به جدول اضافه می‌شود
$("#grd_grid1").onAddRow(function (newIndex) {
  setTimeout(function () {
    bindScoreChange(newIndex); // اتصال تغییر نمره برای ردیف جدید
    calculateTotal();          // محاسبه مجدد مقادیر
  }, 200); // کمی تأخیر برای اطمینان از اینکه کنترل‌ها بارگذاری شده‌اند
});

// زمانی که ردیفی حذف می‌شود
$("#grd_grid1").onDeleteRow(function () {
  calculateTotal(); // محاسبه مجدد بعد از حذف ردیف
});

// در هر بار کلیک روی جدول (به‌عنوان یک اقدام محافظتی برای رفرش داده‌ها)
$("#grd_grid1").on("click", function () {
  calculateTotal();
});

// در زمان کلیک روی دکمه تایید، درخواست AJAX ارسال شود
$("#btn_accept").on("click", function () {
  sendAjaxRequest();
});
