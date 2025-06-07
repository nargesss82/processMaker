$(document).ready(function() {
  // تابع برای بارگذاری داده‌ها و نمایش آنها در DataTable
  function loadDataTable() {
    $.ajax({
      url: window.location.href,   // آدرس ارسال درخواست (آدرس صفحه فعلی)
      type: "POST",                // روش ارسال درخواست POST
      data: {
        act: "getData"             // داده ارسالی: مشخص کردن عمل getData برای دریافت داده‌ها
      },
      dataType: "json",            // انتظار دریافت داده‌ها به صورت JSON
      success: function(response) {  // در صورت موفقیت درخواست
        if (response.data) {          // اگر داده‌ها وجود داشته باشند
          // بررسی اینکه آیا قبلاً DataTable ساخته شده است یا خیر
          if ($.fn.dataTable.isDataTable('#myDataTable')) {
            // اگر ساخته شده، ابتدا داده‌های قبلی را پاک و داده‌های جدید را اضافه کن
            var table = $('#myDataTable').DataTable();
            table.clear().rows.add(response.data).draw();  // بروزرسانی جدول با داده‌های جدید
          } else {
            // اگر DataTable ساخته نشده، آن را برای اولین بار ایجاد کن
            $('#myDataTable').DataTable({
              data: response.data,      // داده‌های دریافت شده برای نمایش در جدول
              columns: [                // تعریف ستون‌ها (برای اطمینان از سازگاری)
                { title: "ID" },
                { title: "ORDER_NAME" },
                { title: "COST" },
                { title: "TIME" },
              ],
              pageLength: 5,            // تعداد ردیف‌های نمایش داده شده در هر صفحه
            });
          }
        } else {
          // اگر داده‌ای دریافت نشد، نمایش پیام هشدار به کاربر
          alert("داده‌ای برای نمایش وجود ندارد.");
        }
      },
      error: function(xhr, status, error) {  // در صورت بروز خطا در درخواست AJAX
        console.error("AJAX error:", error);  // نمایش خطا در کنسول مرورگر
        console.log("Response text:", xhr.responseText);  // نمایش متن پاسخ سرور برای دیباگ
      }
    });
  }

  // رویداد کلیک روی دکمه با شناسه btn_accept برای فراخوانی بارگذاری جدول
  $("#btn_accept").on("click", function () {
    loadDataTable();
  });

  // تنظیم فاصله بالا و پایین دکمه btn_accept با استفاده از CSS
  $("#btn_accept").css({marginTop:"10px"});
  $("#btn_accept").css({marginBottom:"90px"});
});
