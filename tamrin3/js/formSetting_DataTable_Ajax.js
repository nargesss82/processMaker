// تابع ارسال داده‌ها به سرور از طریق AJAX
function sendAjaxRequest() {
  // گرفتن تمام ردیف‌های جدول به‌صورت آرایه
  var rows = $("#grd_grid1").getValue(); 
  console.log(rows); // چاپ داده‌ها در کنسول برای بررسی

  $.ajax({
    url: window.location.href, // ارسال به همان URL صفحه جاری
    type: "POST",              // ارسال با متد POST
    data: {
      act: "saveData",         // پارامتر مشخص‌کننده نوع عملیات
      dataInfo: JSON.stringify(rows) // تبدیل داده‌ها به رشته JSON برای ارسال
    },
    dataType: "json",          // انتظار دریافت پاسخ JSON
    success: function(response) {
      console.log('AJAX Success:', response); // چاپ پاسخ موفق در کنسول
    },
    error: function(xhr, status, error) {
      // چاپ خطاهای مربوط به AJAX در کنسول
      console.error("AJAX Error Status:", status);
      console.error("AJAX Error Message:", error);
      console.log("Full AJAX Response Text:", xhr.responseText); 
    }
  });
}

// تابع بارگذاری جدول DataTable از سرور
function loadDataTable() {
  $.ajax({
    url: window.location.href, // همان URL جاری
    type: "POST",
    data: {
      act: "getData" // درخواست دریافت داده‌ها از سرور
    },
    dataType: "json",
    success: function(response) {
      // اگر داده‌ها دریافت شدند
      if (response.data) {
        // اگر دیتاتیبل قبلاً ساخته شده باشد
        if ($.fn.dataTable.isDataTable('#myDataTable')) {
          var table = $('#myDataTable').DataTable();
          table.clear().rows.add(response.data).draw(); // پاک‌سازی و افزودن داده جدید
        } else {
          // اگر دیتاتیبل برای بار اول ساخته می‌شود
          $('#myDataTable').DataTable({
            data: response.data,
            columns: [
              { title: "Name" },
              { title: "Addres" },
              { title: "Doc" },
              { title: "Score" },
              { title: "Rate" },
              { title: "Sum" }
            ],
            pageLength: 5, // تعداد ردیف در هر صفحه
            language: {
              url: "//cdn.datatables.net/plug-ins/1.13.6/i18n/fa.json" // فارسی‌سازی
            }
          });
        }
      } else {
        alert("داده‌ای برای نمایش وجود ندارد."); // نمایش پیام در صورت نبود داده
      }
    },
    error: function(xhr, status, error) {
      // مدیریت خطا در هنگام دریافت داده‌ها
      console.error("AJAX error:", error);
      console.log("Response text:", xhr.responseText);
    }
  });
}

// تنظیم فاصله دکمه‌ها از بالا
$("#btn_accept").css({ marginTop: "90px" });
$("#btn_dataTable_tab").css({ marginTop: "90px" });
$("#btn_grid_tab").css({ marginTop: "90px" });

// رویداد کلیک روی دکمه تایید
$("#btn_accept").on("click", function () {
  sendAjaxRequest(); // ارسال داده‌ها
  loadDataTable();   // بارگذاری و نمایش داده‌ها در دیتاتیبل
});

// زمانی که سند (صفحه) آماده شد
$(document).ready(function () {
  // مخفی‌سازی جدول دیتاتیبل در ابتدا
  $("#panelTab1").hide();   
  // نمایش جدول گرید (ID مربوط به کامپوننت)
  $("#723532856682e04ed2e2ce3075548072").show();  

  // فقط دکمه مربوط به نمایش دیتاتیبل نمایش داده شود
  $("#btn_grid_tab").hide();      
  $("#btn_dataTable_tab").show();

  // رویداد کلیک برای دکمه نمایش دیتاتیبل
  $("#btn_dataTable_tab").click(function () {
    $("#panelTab1").show(); // نمایش دیتاتیبل
    $("#723532856682e04ed2e2ce3075548072").hide(); // مخفی‌سازی گرید
    $("#btn_dataTable_tab").hide(); // مخفی کردن دکمه فعلی
    $("#btn_grid_tab").show(); // نمایش دکمه مخالف برای بازگشت
  });

  // رویداد کلیک برای دکمه بازگشت به گرید
  $("#btn_grid_tab").click(function () {
    $("#panelTab1").hide(); // مخفی‌سازی دیتاتیبل
    $("#723532856682e04ed2e2ce3075548072").show(); // نمایش گرید
    $("#btn_grid_tab").hide();
    $("#btn_dataTable_tab").show();
  });
});
