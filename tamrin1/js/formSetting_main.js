// تعریف آرایه‌ی sections که شامل تنظیمات هر بخش است
const sections = [
  {
    id: "subtitle0000000001", // شناسه بخش اول (header)
    fields: [                 // آرایه‌ای از سلکتورهای فیلدهای داخل این بخش
      "#txt_firstName",
      "#txt_lastName",
      "#txt_nationalCode",
      "#dat_birthday",
      "#txt_fathername",
      "#txt_certificateNumber",
      "#txt_phone",
      "#txt_telephone",
      "#rad_gender",
      "#txt_birthPlace"
    ],
    style: {                  // تنظیمات استایل برای هدر بخش
      backgroundColor: "#ddfccc",
      color: "#01574a"
    }
  },
  {
    id: "subtitle0000000002", // شناسه بخش دوم
    fields: [
      "#txt_legalTelephone",
      "#txt_legalPhone",
      "#txt_legalNationalCode",
      "#txt_legalFirstname",
      "#txt_legalLastname"
    ],
    style: {
      backgroundColor: "#ddfccc",
      color: "#01574a"
    }
  },
  {
    id: "subtitle0000000003", // شناسه بخش سوم
    fields: [
      "#txt_postalCode",
      "#drp_province",
      "#drp_city",
      "#txr_address",
      "#txt_domainTelephone"
    ],
    style: {
      backgroundColor: "#ddfccc",
      color: "#01574a"
    }
  },
  {
    id: "subtitle0000000004", // شناسه بخش چهارم
    fields: [
      "#mfi_uploadFile",
      "#txt_file"
    ],
    style: {
      backgroundColor: "#014339",
      color: "white"
    }
  }
];

// مقداردهی اولیه و آماده‌سازی بخش‌ها
sections.forEach(section => {
  // ذخیره وضعیت دیداری بخش (باز یا بسته بودن) داخل شیء خود بخش
  section.visible = false;

  // گرفتن المنت هدر بخش بر اساس id
  const $header = $(`#${section.id}`);

  // اعمال استایل اولیه به هدر بخش (رنگ پس‌زمینه، رنگ متن، اشاره‌گر موس و ... )
  $header.css({
    cursor: "pointer",               // تغییر شکل موس هنگام هاور روی هدر (نمایش کلیک‌خور بودن)
    backgroundColor: section.style.backgroundColor, // رنگ پس‌زمینه از تنظیمات بخش
    padding: "10px",                 // فاصله داخلی هدر
    borderRadius: "6px",             // گوشه‌های گرد
    marginBottom: "10px",            // فاصله پایین هدر با محتوا یا هدر بعدی
    color: section.style.color       // رنگ متن از تنظیمات بخش
  });

  // پنهان کردن تمام فیلدهای آن بخش در ابتدا (تا وقتی باز نشود نمایش داده نشوند)
  $(section.fields.join(", ")).hide();

  // افزودن رویداد کلیک به هدر بخش
  $header.click(function() {
    // تغییر وضعیت دیداری بخش به حالت مخالف وضعیت فعلی (نمایش/پنهان)
    section.visible = !section.visible;

    if (section.visible) {
      // اگر بخش باز شد، نمایش فیلدها به صورت انیمیشن اسلاید به پایین
      $(section.fields.join(", ")).slideDown(300);
      // تغییر آیکون نشان‌دهنده وضعیت به فلش رو به پایین
      $(`#${section.id} .icon`).html("▼");
    } else {
      // اگر بخش بسته شد، پنهان کردن فیلدها با انیمیشن اسلاید به بالا
      $(section.fields.join(", ")).slideUp(300);
      // تغییر آیکون به فلش رو به راست
      $(`#${section.id} .icon`).html("►");
    }
  });

  // اگر آیکون وضعیت (فلش) داخل هدر وجود ندارد، آن را اضافه کن
  if ($(`#${section.id} .icon`).length === 0) {
    $header.append('<span class="icon">►</span>');
  }
});

// تابعی برای نمایش یا پنهان کردن بخش‌ها بر اساس مقدار دراپ‌داون وضعیت
function showS() {
  // گرفتن مقدار فعلی کنترل دراپ‌داون وضعیت
  const value = $("#drp_status").getControl().val();

  if (value != "0") {
    // اگر مقدار غیر صفر است، بخش دوم را نمایش بده و بخش اول را پنهان کن
    $("#subtitle0000000002").show();
    $("#subtitle0000000001").hide();
  } else {
    // اگر مقدار صفر است، بخش اول را نمایش بده و بخش دوم را پنهان کن
    $("#subtitle0000000002").hide();
    $("#subtitle0000000001").show();
  }
}

// اجرای اولیه پس از اینکه کل صفحه (DOM) بارگذاری شد
showS();                  // اجرای تابع یک بار برای تعیین نمایش اولیه بخش‌ها
$("#drp_status").change(showS); // افزودن شنونده رویداد تغییر مقدار دراپ‌داون، برای بروز رسانی نمایش بخش‌ها هنگام تغییر
