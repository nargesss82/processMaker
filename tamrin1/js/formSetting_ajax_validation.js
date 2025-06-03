
//AJAX
function sendAjaxRequestUser() {
  var nationalID = $("#txt_nationalCode").getValue();
  console.log("National ID:", nationalID); // For debugging

  var dataInfo = {
    national_id: nationalID,
  };

  $.ajax({
    url: window.location.href, 
    type: "POST",
    data: {
      act: "checkUserExists",
      dataInfo: JSON.stringify(dataInfo) // stringify the object
    },
    dataType: "json", // Expect JSON response
    success: function(response) {
      console.log('AJAX Success:', response);
      
      if(response && response.result===true) {
        alert("کاربر با این کدملی قبلا ثبت شده است");
      } else if (response && response.error) {
        alert("Application Error: " + response.error);
      }

    },
    error: function(xhr, status, error) {
      console.error("AJAX Error Status:", status);
      console.error("AJAX Error Message:", error);
      console.log("Full AJAX Response Text:", xhr.responseText); 
      alert("Failed to process request. Check console for details. Response: " + xhr.responseText.substring(0, 200));
    }
  });
}
function sendAjaxRequestPostalCode() {
  var postalCode = $("#txt_postalCode").getValue();
  console.log("Postal Code:", postalCode); // For debugging

  var dataInfo = {
    postal_code: postalCode
  };

  $.ajax({
    url: window.location.href, 
    type: "POST",
    data: {
      act: "checkPostalCodeExists",
      dataInfo: JSON.stringify(dataInfo) //  stringify the object
    },
    dataType: "json", // Expect JSON response
    success: function(response) {
      console.log('AJAX Success:', response);
      
      if(response && response.result===true) {
       
        alert("ملک با این کدپستی قبلا ثبت شده است");
      } else if (response && response.error) {
        alert("Application Error: " + response.error);
      }

    },
    error: function(xhr, status, error) {
      console.error("AJAX Error Status:", status);
      console.error("AJAX Error Message:", error);
      console.log("Full AJAX Response Text:", xhr.responseText); 
      alert("Failed to process request. Check console for details. Response: " + xhr.responseText.substring(0, 200));
    }
  });
}

// کلیک روی دکمه ثبت
$("#btn_check").click(function (e) {
  e.preventDefault(); 

  let isValid = true;
  let errorMessages = [];

  function validateField(selector, length, label) {
    const $input = $(selector).find("input");
    const value = $input.val().trim();

    if (!/^\d+$/.test(value) || value.length !== length) {
      $input[0].style.setProperty("border", "2px solid red", "important");
      errorMessages.push(`${label} باید ${length} رقم و فقط عدد باشد.`);
      return false;
    } else {
      $input[0].style.setProperty("border", "1px solid #ccc", "important");
      return true;
    }
  }

  function isValidIranianNationalCode(input) {
    if (!/^\d{10}$/.test(input)) return false;
    if (/^(\d)\1{9}$/.test(input)) return false;

    const check = parseInt(input[9]);
    const sum = input.split('').slice(0, 9).reduce((total, num, i) => total + parseInt(num) * (10 - i), 0);
    const remainder = sum % 11;

    return (remainder < 2 && check === remainder) || (remainder >= 2 && check === 11 - remainder);
  }

  const status_value = $("#drp_status").getValue();
  if (status_value != 0) {
    if (!validateField("#txt_legalTelephone", 11, "تلفن ثابت")) isValid = false;
    if (!validateField("#txt_legalPhone", 11, "تلفن همراه")) isValid = false;
    if (!validateField("#txt_postalCode", 10, "کدپستی")) isValid = false;
    if (!validateField("#txt_legalNationalCode", 10, "کدملی")) isValid = false;

    if (isValid) {txt_nationalCode
    const nationalCode = $("#txt_legalNationalCode").getValue();
                  if (!isValidIranianNationalCode(nationalCode)) {
                    $("#txt_legalNationalCode").find("input")[0].style.setProperty("border", "2px solid red", "important");
                    errorMessages.push("کد ملی نامعتبر است.");
                    isValid = false;
                  }
                 }
  } else {
    if (!validateField("#txt_telephone", 11, "تلفن ثابت")) isValid = false;
    if (!validateField("#txt_phone", 11, "تلفن همراه")) isValid = false;
    if (!validateField("#txt_postalCode", 10, "کدپستی")) isValid = false;
    if (!validateField("#txt_nationalCode", 10, "کدملی")) isValid = false;

    if (isValid) {
      const nationalCode = $("#txt_nationalCode").getValue();
      if (!isValidIranianNationalCode(nationalCode)) {
        $("#txt_nationalCode").find("input")[0].style.setProperty("border", "2px solid red", "important");
        errorMessages.push("کد ملی نامعتبر است.");
        isValid = false;
      }
    }
  }

  if (!isValid) {
    alert(errorMessages.join("\n"));
  } else {
    sendAjaxRequestUser();
    sendAjaxRequestPostalCode();

  }
});
$("#sbt_submit").submit();
