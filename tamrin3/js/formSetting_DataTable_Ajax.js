function sendAjaxRequest() {
  var rows = $("#grd_grid1").getValue(); 
  console.log(rows);
  $.ajax({
    url: window.location.href, 
    type: "POST",
    data: {
      act: "saveData",
      dataInfo: JSON.stringify(rows)
    },
    dataType: "json",
    success: function(response) {
      console.log('AJAX Success:', response);     
    },
    error: function(xhr, status, error) {
      console.error("AJAX Error Status:", status);
      console.error("AJAX Error Message:", error);
      console.log("Full AJAX Response Text:", xhr.responseText); 
    }
  });
}


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
              { title: "Name" },
              { title: "Addres" },
              { title: "Doc" },
              { title: "Score" },
              { title: "Rate" },
              { title: "Sum" }
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


   

$("#btn_accept").css({marginTop:"90px"});

$("#btn_accept").on("click", function () {
  sendAjaxRequest();
 loadDataTable();
});
$(document).ready(function() {
  $("#panelTab1").hide();   
  $("#723532856682e04ed2e2ce3075548072").show();  
  $("#btn_grid_tab").hide();
  $("#btn_dataTable_tab").show();

  $("#btn_dataTable_tab").click(function() {
    $("#panelTab1").show();
    $("#723532856682e04ed2e2ce3075548072").hide();
    $("#btn_dataTable_tab").hide();
    $("#btn_grid_tab").show();
  });
  
  $("#btn_grid_tab").click(function() {
    $("#panelTab1").hide();
    $("#723532856682e04ed2e2ce3075548072").show(); 
    $("#btn_grid_tab").hide();
    $("#btn_dataTable_tab").show();
  });
});
$("#btn_dataTable_tab").css({marginTop:"90px"});
$("#btn_grid_tab").css({marginTop:"90px"});