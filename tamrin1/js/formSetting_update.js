// تابع ارسال درخواست AJAX برای بررسی وجود کاربر بر اساس کدملی
function sendAjaxRequestUser() {
  return new Promise((resolve, reject) => {
    // گرفتن مقدار وضعیت (در صورت غیر صفر، از کدملی قانونی استفاده می‌کنیم)
    const value = $("#drp_status").getValue();
    let nationalID;
    if (value != "0") {
      nationalID = $("#txt_legalNationalCode").getValue();
    } else {
      nationalID = $("#txt_nationalCode").getValue();
    }
    console.log("National ID:", nationalID);

    // آماده‌سازی داده ارسالی به سرور
    var dataInfo = {
      national_id: nationalID,
    };

    // ارسال AJAX به همان URL صفحه جاری (POST)
    $.ajax({
      url: window.location.href,
      type: "POST",
      data: {
        act: "checkUserExists",          // عملیات سرور که درخواست می‌کنیم
        dataInfo: JSON.stringify(dataInfo), // داده‌ها به صورت رشته JSON
      },
      dataType: "json",
      success: function (response) {
        console.log("AJAX Success (User):", response);
        resolve(response);              // در صورت موفقیت، پاسخ را resolve کن
      },
      error: function (xhr, status, error) {
        console.error("AJAX Error Status (User):", status);
        console.error("AJAX Error Message (User):", error);
        console.log("Full AJAX Response Text (User):", xhr.responseText);
        reject({ xhr, status, error }); // در صورت خطا، reject کن
      },
    });
  });
}

// تابع ارسال درخواست AJAX برای بررسی وجود کدپستی
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

// رویداد کلیک روی دکمه ثبت فرم
$("#btn_submit").click(function (e) {
  // دریافت مقدار وضعیت انتخاب شده در دراپ‌داون
  const value = $("#drp_status").getValue();

  // فعال/غیرفعال کردن اعتبارسنجی برخی بخش‌ها بر اساس وضعیت
  if (value != "0") {
    var nationalID = $("#txt_legalNationalCode").getValue();
    $("#493214526684009b529c365011533751").enableValidation();  // فعال کردن اعتبارسنجی بخش قانونی
    $("#756206590684009f3aa8264098370405").disableValidation(); // غیرفعال کردن بخش غیرقانونی
  } else {
    $("#756206590684009f3aa8264098370405").disableValidation();
    $("#493214526684009b529c365011533751").enableValidation();
  }

  let isValid = true;      // متغیر برای ذخیره وضعیت کلی اعتبارسنجی
  let errorMessages = [];  // آرایه برای ذخیره پیام‌های خطا

  // تابع اعتبارسنجی فیلد عددی با طول مشخص
  function validateField(selector, length, label) {
    const value = $(selector).getValue();
    console.log(value);

    // اگر مقدار شامل فقط عدد نباشد یا طولش برابر طول موردنظر نباشد
    if (!/^\d+$/.test(value) || value.length !== length) {
      // تغییر استایل حاشیه ورودی به قرمز (مهم!)
      $(selector).find("input")[0].style.setProperty("border", "2px solid red", "important");
      errorMessages.push(`${label} باید ${length} رقم و فقط عدد باشد.`);
      return false;
    } else {
      // بازگرداندن استایل حاشیه به حالت عادی
      $(selector).find("input")[0].style.setProperty("border", "1px solid #ccc", "important");
      return true;
    }
  }

  // تابع اعتبارسنجی فیلدهای اجباری (نباید خالی باشند)
  function required(selector, label) {
    const value = $(selector).getValue();
    console.log(value);
    if (value == '') {
      $(selector).find("input")[0].style.setProperty("border", "2px solid red", "important");
      errorMessages.push(`${label} الزامی است`);
      return false;
    } else {
      $(selector).find("input")[0].style.setProperty("border", "1px solid #ccc", "important");
      return true;
    }
  }

  // تابع اعتبارسنجی کد ملی ایرانی
  function isValidIranianNationalCode(input) {
    if (!/^\d{10}$/.test(input)) return false;       // باید ۱۰ رقم باشد
    if (/^(\d)\1{9}$/.test(input)) return false;    // اعداد تکراری مثل 1111111111 معتبر نیست

    const check = parseInt(input[9]);  // رقم کنترل (آخرین رقم)
    const sum = input.split('').slice(0, 9).reduce((total, num, i) => total + parseInt(num) * (10 - i), 0);
    const remainder = sum % 11;

    return (remainder < 2 && check === remainder) || (remainder >= 2 && check === 11 - remainder);
  }

  // اعتبارسنجی فیلدها بر اساس وضعیت
  const status_value = $("#drp_status").getValue();
  if (status_value != 0) {
    if (!validateField("#txt_legalTelephone", 11, "تلفن ثابت")) isValid = false;
    if (!validateField("#txt_legalPhone", 11, "تلفن همراه")) isValid = false;
    if (!validateField("#txt_postalCode", 10, "کدپستی")) isValid = false;
    if (!validateField("#txt_legalNationalCode", 10, "کدملی")) isValid = false;
    if (!required("#txt_legalFirstname", "نام")) isValid = false;
    if (!required("#txt_legalLastname", "نام خانوادگی")) isValid = false;

    if (isValid) {
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
    if (!required("#txt_firstName", "نام")) isValid = false;
    if (!required("#txt_lastName", "نام خانوادگی")) isValid = false;

    if (isValid) {
      const nationalCode = $("#txt_nationalCode").getValue();
      if (!isValidIranianNationalCode(nationalCode)) {
        $("#txt_nationalCode").find("input")[0].style.setProperty("border", "2px solid red", "important");
        errorMessages.push("کد ملی نامعتبر است.");
        isValid = false;
      }
    }
  }

  // اگر اعتبارسنجی موفق نبود، پیام‌های خطا را نشان بده و ارسال فرم را متوقف کن
  if (!isValid) {
    alert(errorMessages.join("\n"));
    e.preventDefault();
  } else {
    // اگر اعتبارسنجی اولیه موفق بود، دو درخواست AJAX را به طور همزمان اجرا کن
    Promise.all([sendAjaxRequestUser(), sendAjaxRequestPostalCode()])
      .then(([userResponse, postalResponse]) => {
        let errorMessages = [];

        // بررسی نتیجه درخواست کدملی
        if (userResponse && userResponse.result === true) {
          errorMessages.push("کاربر با این کدملی قبلا ثبت شده است");
        } else if (userResponse && userResponse.error) {
          errorMessages.push("Application Error (User): " + userResponse.error);
        }

        // بررسی نتیجه درخواست کدپستی
        if (postalResponse && postalResponse.result === true) {
          errorMessages.push("ملک با این کدپستی قبلا ثبت شده است");
        } else if (postalResponse && postalResponse.error) {
          errorMessages.push("Application Error (Postal): " + postalResponse.error);
        }

        // اگر خطایی یافت شد، نمایش پیغام‌ها و جلوگیری از ارسال فرم
        if (errorMessages.length > 0) {
          alert(errorMessages.join("\n"));
          e.preventDefault();
        } else {
          // اگر همه چیز اوکی بود، ارسال فرم را ادامه بده
          $("#191185800682dc59e7c9c54079966353").submitForm();
        }
      })
      .catch((error) => {
        // اگر درخواست AJAX با خطا مواجه شد، خطا را در کنسول نمایش بده و فرم ارسال نشود
        console.error("AJAX Error in Promise.all:", error);
        alert("خطا در ارتباط با سرور. لطفا مجددا تلاش کنید.");
        e.preventDefault();
      });

    // جلوگیری از ارسال فرم در حالت عادی تا وقتی که AJAXها برگردند
    e.preventDefault();
  }
});
