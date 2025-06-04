
//AJAX
function sendAjaxRequestUser() {
  return new Promise((resolve, reject) => {
    const value = $("#drp_status").getValue();
    if (value != "0") {
      var nationalID = $("#txt_legalNationalCode").getValue();
    }else{
      var nationalID = $("#txt_nationalCode").getValue();
    }
    console.log("National ID:", nationalID);

    var dataInfo = {
      national_id: nationalID,
    };

    $.ajax({
      url: window.location.href,
      type: "POST",
      data: {
        act: "checkUserExists",
        dataInfo: JSON.stringify(dataInfo),
      },
      dataType: "json",
      success: function (response) {
        console.log("AJAX Success (User):", response);
        resolve(response);
      },
      error: function (xhr, status, error) {
        console.error("AJAX Error Status (User):", status);
        console.error("AJAX Error Message (User):", error);
        console.log("Full AJAX Response Text (User):", xhr.responseText);
        reject({ xhr, status, error });
      },
    });
  });
}

function sendAjaxRequestPostalCode() {
  return new Promise((resolve, reject) => {
    var postalCode = $("#txt_postalCode").getValue();
    console.log("Postal Code:", postalCode);

    var dataInfo = {
      postal_code: postalCode,
    };

    $.ajax({
      url: window.location.href,
      type: "POST",
      data: {
        act: "checkPostalCodeExists",
        dataInfo: JSON.stringify(dataInfo),
      },
      dataType: "json",
      success: function (response) {
        console.log("AJAX Success (Postal):", response);
        resolve(response);
      },
      error: function (xhr, status, error) {
        console.error("AJAX Error Status (Postal):", status);
        console.error("AJAX Error Message (Postal):", error);
        console.log("Full AJAX Response Text (Postal):", xhr.responseText);
        reject({ xhr, status, error });
      },
    });
  });
}

// کلیک روی دکمه ثبت
$("#btn_submit").click(function (e) {
  const value = $("#drp_status").getValue();
  if (value != "0") {
    var nationalID = $("#txt_legalNationalCode").getValue();
    $("#493214526684009b529c365011533751").enableValidation();
    $("#756206590684009f3aa8264098370405").disableValidation();

  }else{
    $("#756206590684009f3aa8264098370405").disableValidation();
    $("#493214526684009b529c365011533751").enableValidation();
  }

  let isValid = true;
  let errorMessages = [];

  function validateField(selector, length, label) {
    const value = $(selector).getValue();
    //const value = $input.getValue();
    console.log(value);

    if (!/^\d+$/.test(value) || value.length !== length) {
      $(selector).find("input")[0].style.setProperty("border", "2px solid red", "important");
      errorMessages.push(`${label} باید ${length} رقم و فقط عدد باشد.`);
      return false;
    } else {
      $(selector).find("input")[0].style.setProperty("border", "1px solid #ccc", "important");
      return true;
    }
  }

  function required(selector,label) {
    const value = $(selector).getValue();
    //const value = $input.getValue();
    console.log(value);
    if(value==''){
      $(selector).find("input")[0].style.setProperty("border", "2px solid red", "important");
      errorMessages.push(` ${label} الزامی است `);
      return false;
    }else {
      $(selector).find("input")[0].style.setProperty("border", "1px solid #ccc", "important");
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
    if (!required("#txt_legalFirstname","نام")) isValid = false;
    if (!required("#txt_legalLastname","نام خانوادگی")) isValid = false;


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
    if (!required("#txt_firstName","نام")) isValid = false;
    if (!required("#txt_lastName","نام خانوادگی")) isValid = false;

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
  e.preventDefault();
} else {
  Promise.all([sendAjaxRequestUser(), sendAjaxRequestPostalCode()])
    .then(([userResponse, postalResponse]) => {
      let errorMessages = [];

      // بررسی پاسخ درخواست کدملی
      if (userResponse && userResponse.result === true) {
        errorMessages.push("کاربر با این کدملی قبلا ثبت شده است");
      } else if (userResponse && userResponse.error) {
        errorMessages.push("Application Error (User): " + userResponse.error);
      }

      // بررسی پاسخ درخواست کدپستی
      if (postalResponse && postalResponse.result === true) {
        errorMessages.push("ملک با این کدپستی قبلا ثبت شده است");
      } else if (postalResponse && postalResponse.error) {
        errorMessages.push("Application Error (Postal): " + postalResponse.error);
      }

      // اگر خطایی وجود داشت، نمایش خطاها
      if (errorMessages.length > 0) {
        alert(errorMessages.join("\n"));
        e.preventDefault();
      } else {
        // اگر هر دو درخواست موفق بودند و هیچ خطایی نداشتند، فرم را ارسال کنید
        $("#191185800682dc59e7c9c54079966353").submitForm();
      }
    })
    .catch((error) => {
      // مدیریت خطاهای AJAX
      console.error("AJAX Error:", error);
      alert(
        "Failed to process request. Check console for details. Response: " +
          (error.xhr.responseText || "").substring(0, 200)
      );
      e.preventDefault();
    });
}
});

