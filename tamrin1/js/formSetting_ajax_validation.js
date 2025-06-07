// تابع ارسال درخواست AJAX برای بررسی وجود کاربر با کدملی
function sendAjaxRequestUser() {
  return new Promise((resolve, reject) => {
    // گرفتن مقدار وضعیت از دراپ‌داون
    const value = $("#drp_status").getValue();

    // تعیین کدملی بر اساس مقدار وضعیت (حقوقی یا حقیقی)
    if (value != "0") {
      var nationalID = $("#txt_legalNationalCode").getValue();  // کدملی حقوقی
    } else {
      var nationalID = $("#txt_nationalCode").getValue();       // کدملی حقیقی
    }

    console.log("National ID:", nationalID);

    // ساخت شیء داده ارسالی به سرور
    var dataInfo = {
      national_id: nationalID,
    };

    // ارسال درخواست AJAX به آدرس صفحه فعلی با متد POST
    $.ajax({
      url: window.location.href,
      type: "POST",
      data: {
        act: "checkUserExists",                      // نام اکشن برای شناسایی نوع درخواست در سرور
        dataInfo: JSON.stringify(dataInfo),          // داده‌ها به صورت رشته JSON ارسال می‌شود
      },
      dataType: "json",                              // انتظار دریافت داده JSON از سرور
      success: function (response) {                 // در صورت موفقیت پاسخ سرور
        console.log("AJAX Success (User):", response);
        resolve(response);                           // نتیجه را به Promise برمی‌گرداند (موفقیت)
      },
      error: function (xhr, status, error) {         // در صورت خطا در درخواست AJAX
        console.error("AJAX Error Status (User):", status);
        console.error("AJAX Error Message (User):", error);
        console.log("Full AJAX Response Text (User):", xhr.responseText);
        reject({ xhr, status, error });              // خطا را به Promise برمی‌گرداند (رد)
      },
    });
  });
}

// تابع ارسال درخواست AJAX برای بررسی وجود کدپستی
function sendAjaxRequestPostalCode() {
  return new Promise((resolve, reject) => {
    // گرفتن مقدار کدپستی از ورودی
    var postalCode = $("#txt_postalCode").getValue();
    console.log("Postal Code:", postalCode);

    // ساخت شیء داده ارسالی
    var dataInfo = {
      postal_code: postalCode,
    };

    // ارسال درخواست AJAX مشابه تابع قبلی
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

// رویداد کلیک روی دکمه ثبت
$("#btn_submit").click(function (e) {
  // گرفتن مقدار وضعیت از دراپ‌داون
  const value = $("#drp_status").getValue();

  // بر اساس وضعیت، فعال/غیرفعال کردن اعتبارسنجی روی فیلدهای مختلف
  if (value != "0") {
    // اگر وضعیت حقوقی بود، اعتبارسنجی تلفن حقوقی فعال و تلفن حقیقی غیرفعال می‌شود
    $("#493214526684009b529c365011533751").enableValidation();
    $("#756206590684009f3aa8264098370405").disableValidation();
  } else {
    // اگر وضعیت حقیقی بود، بالعکس
    $("#756206590684009f3aa8264098370405").disableValidation();
    $("#493214526684009b529c365011533751").enableValidation();
  }

  // متغیر کنترل اعتبارسنجی کلی فرم
  let isValid = true;

  // آرایه‌ای برای نگهداری پیام‌های خطا
  let errorMessages = [];

  // تابع کمکی برای اعتبارسنجی طول و عدد بودن مقدار ورودی
  function validateField(selector, length, label) {
    const value = $(selector).getValue();
    console.log(value);

    // بررسی اینکه مقدار فقط شامل اعداد بوده و طول آن برابر با مقدار داده شده باشد
    if (!/^\d+$/.test(value) || value.length !== length) {
      // تغییر رنگ حاشیه به قرمز در صورت خطا
      $(selector).find("input")[0].style.setProperty("border", "2px solid red", "important");
      errorMessages.push(`${label} باید ${length} رقم و فقط عدد باشد.`);
      return false;
    } else {
      // بازگرداندن رنگ حاشیه به حالت پیش‌فرض در صورت صحت مقدار
      $(selector).find("input")[0].style.setProperty("border", "1px solid #ccc", "important");
      return true;
    }
  }

  // تابع کمکی برای اعتبارسنجی الزامی بودن مقدار
  function required(selector, label) {
    const value = $(selector).getValue();
    console.log(value);

    if (value == '') {
      // در صورت خالی بودن، رنگ حاشیه قرمز و پیام خطا اضافه شود
      $(selector).find("input")[0].style.setProperty("border", "2px solid red", "important");
      errorMessages.push(` ${label} الزامی است `);
      return false;
    } else {
      // اگر مقدار پر بود، رنگ حاشیه به حالت عادی برگردد
      $(selector).find("input")[0].style.setProperty("border", "1px solid #ccc", "important");
      return true;
    }
  }

  // تابع بررسی صحت کد ملی ایرانی
  function isValidIranianNationalCode(input) {
    if (!/^\d{10}$/.test(input)) return false;              // بررسی اینکه دقیقا 10 رقم باشد
    if (/^(\d)\1{9}$/.test(input)) return false;           // بررسی عدم تکرار تمام ارقام (مثلا همه صفر)

    // محاسبه عدد کنترلی کد ملی
    const check = parseInt(input[9]);
    const sum = input.split('').slice(0, 9)
      .reduce((total, num, i) => total + parseInt(num) * (10 - i), 0);
    const remainder = sum % 11;

    // شرایط اعتبارسنجی بر اساس الگوریتم کدملی
    return (remainder < 2 && check === remainder) || (remainder >= 2 && check === 11 - remainder);
  }

  // دریافت مقدار وضعیت دراپ‌داون به صورت عددی
  const status_value = $("#drp_status").getValue();

  // اعتبارسنجی فیلدها بر اساس وضعیت انتخابی (حقوقی یا حقیقی)
  if (status_value != 0) {
    // اعتبارسنجی شماره تلفن ثابت حقوقی با 11 رقم عددی
    if (!validateField("#txt_legalTelephone", 11, "تلفن ثابت")) isValid = false;
    // اعتبارسنجی شماره تلفن همراه حقوقی
    if (!validateField("#txt_legalPhone", 11, "تلفن همراه")) isValid = false;
    // اعتبارسنجی کدپستی
    if (!validateField("#txt_postalCode", 10, "کدپستی")) isValid = false;
    // اعتبارسنجی کدملی حقوقی
    if (!validateField("#txt_legalNationalCode", 10, "کدملی")) isValid = false;
    // اعتبارسنجی نام
    if (!required("#txt_legalFirstname", "نام")) isValid = false;
    // اعتبارسنجی نام خانوادگی
    if (!required("#txt_legalLastname", "نام خانوادگی")) isValid = false;

    // اگر تا اینجا خطا نداشتیم، بررسی اعتبار کد ملی
    if (isValid) {
      const nationalCode = $("#txt_legalNationalCode").getValue();
      if (!isValidIranianNationalCode(nationalCode)) {
        // در صورت نامعتبر بودن کد ملی، نمایش خطا و تغییر رنگ حاشیه
        $("#txt_legalNationalCode").find("input")[0].style.setProperty("border", "2px solid red", "important");
        errorMessages.push("کد ملی نامعتبر است.");
        isValid = false;
      }
    }
  } else {
    // اعتبارسنجی برای وضعیت حقیقی
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

  // اگر اعتبارسنجی فرم خطا داشت، نمایش پیام خطا و جلوگیری از ارسال فرم
  if (!isValid) {
    alert(errorMessages.join("\n"));
    e.preventDefault(); // جلوگیری از ارسال فرم
  } else {
    // اگر اعتبارسنجی اولیه موفق بود، ارسال همزمان دو درخواست AJAX برای بررسی وجود کاربر و کدپستی
    Promise.all([sendAjaxRequestUser(), sendAjaxRequestPostalCode()])
      .then(([userResponse, postalResponse]) => {
        let errorMessages = [];

        // بررسی پاسخ سرور برای وجود کدملی
        if (userResponse && userResponse.result === true) {
          errorMessages.push("کاربر با این کدملی قبلا ثبت شده است");
        } else if (userResponse && userResponse.error) {
          errorMessages.push("Application Error (User): " + userResponse.error);
        }

        // بررسی پاسخ سرور برای وجود کدپستی
        if (postalResponse && postalResponse.result === true) {
          errorMessages.push("ملک با این کدپستی قبلا ثبت شده است");
        } else if (postalResponse && postalResponse.error) {
          errorMessages.push("Application Error (Postal): " + postalResponse.error);
        }

        // اگر خطایی در پاسخ‌ها بود، نمایش آنها و جلوگیری از ارسال فرم
        if (errorMessages.length > 0) {
          alert(errorMessages.join("\n"));
          e.preventDefault();
        } else {
          // اگر هیچ خطایی نبود، فرم ارسال می‌شود (تابع submitForm مربوط به پلاگین یا فرم خاص شماست)
          $("#31261142868259c7f34e4b5091340326").submitForm();
        }
      })
      .catch((error) => {
        // مدیریت خطاهای کلی AJAX
        console.error("AJAX Error:", error);
        alert(
          "Failed to process request. Check console for details. Response: " +
          (error.xhr.responseText || "").substring(0, 200)
        );
        e.preventDefault();
      });
  }
});
