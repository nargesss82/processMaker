function calculateTotal() {

  var control = $("#grd_grid1").getValue(0, "txt_score");


  if (Array.isArray(control) && control.every(arr => Array.isArray(arr))) {
    if (control.length === 0) return;

    var totalSum = 0;

    for (var j = 0; j < control.length; j++) {
      var score = parseFloat(control[j][3]); // ایندکس 3: نمره
      var rate = parseFloat(control[j][4]); // ایندکس 4: ضریب

      if (!isNaN(score) && !isNaN(rate)) {
        var product = score * rate;

        // مقدار در ستون ششم (ایندکس 5) قرار می‌گیرد
        control[j][5] = product.toString();
        // console.log(control);
        $("#grd_grid1").setValue(product,j+1,'6');
        totalSum += score;

      }
    }

    // در نهایت، مجموع کلی نمایش داده می‌شود

    $("#txt_total").setValue(totalSum.toString());

    // اگر لازم داری جدول هم آپدیت بشه:
    $("#grd_grid1").setValue(0, "txt_score", control);
  }

}

function bindScoreChange(rowIndex) {
  var control = $("#grd_grid1").getControl(rowIndex, "txt_score");
  var input = $(control).find("input");


  if (input.length) {
    input.off("change").on("change", function () {
      calculateTotal();
    });
  }
}

var rowCount = $("#grd_grid1").getNumberRows();
for (var i = 1; i <= rowCount; i++) {
  bindScoreChange(i);
}

calculateTotal();

$("#grd_grid1").onAddRow(function (newIndex) {
  setTimeout(function () {
    bindScoreChange(newIndex);
    calculateTotal();
  }, 200);
});

$("#grd_grid1").onDeleteRow(function () {
  calculateTotal();
});
$("#grd_grid1").on("click", function () {
  calculateTotal();
});
$("#btn_accept").on("click", function () {
  sendAjaxRequest();
});

