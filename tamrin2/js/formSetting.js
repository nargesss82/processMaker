function loadDataTable() {
  $.ajax({
    url: window.location.href,
    type: "POST",
    data: {
      act: "getData"
    },
    dataType: "json",
    success: function(response) {
      if (response.data) {
        // اگر دیتاتیبل قبلاً ساخته شده
        if ($.fn.dataTable.isDataTable('#myDataTable')) {
          var table = $('#myDataTable').DataTable();
          table.clear().rows.add(response.data).draw();
        } else {
          // ساخت دیتاتیبل برای بار اول
          $('#myDataTable').DataTable({
            data: response.data,
            columns: [
              { title: "ID" },
              { title: "ORDER_NAME" },
              { title: "COST" },
              { title: "TIME" },
            ],
            pageLength: 5,
            language: {
              url: "//cdn.datatables.net/plug-ins/1.13.6/i18n/fa.json"
            }
          });
        }
      } else {
        alert("داده‌ای برای نمایش وجود ندارد.");
      }
    },
    error: function(xhr, status, error) {
      console.error("AJAX error:", error);
      console.log("Response text:", xhr.responseText);
    }
  });
}
$("#btn_accept").on("click", function () {
 loadDataTable();
});
$("#btn_accept").css({marginTop:"10px"});
$("#btn_accept").css({marginBottom:"90px"});