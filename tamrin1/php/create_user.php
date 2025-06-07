<?php
// دریافت مقدار وضعیت از دراپ‌داون وضعیت
$status = @@drp_status;

// اگر وضعیت برابر 0 باشد، مقادیر از فیلدهای معمولی گرفته می‌شود
if ($status == 0) {
    $firstname = @@txt_firstName;
    $lastname = @@txt_lastName;
    $username = @@txt_nationalCode;
    $password = @@txt_phone;
// اگر وضعیت برابر 1 باشد، مقادیر از فیلدهای حقوقی گرفته می‌شود
} else if ($status == 1) {
    $firstname = @@txt_legalFirstname;
    $lastname = @@txt_legalLastname;
    $username = @@txt_legalNationalCode;
    $password = @@txt_legalPhone;
}

// دریافت کدپستی از فیلد مربوطه
$postalcode = @@txt_postalCode;

// ایجاد کاربر جدید در ProcessMaker با استفاده از تابع PMFCreateUser
@%result = PMFCreateUser($username, $password, $firstname, $lastname, 'em@gmail.com', 'PROCESSMAKER_USER');

// اگر ایجاد کاربر موفقیت‌آمیز بود
if (@%result) {
    // به‌روزرسانی آدرس (کدپستی) کاربر در جدول USERS
    executeQuery("UPDATE USERS SET USR_ADDRESS = '$postalcode' WHERE USR_USERNAME = '$username'");

    // بارگذاری کلاس Users و ایجاد نمونه آن
    require_once 'classes/model/Users.php';
    $u = new Users();

    // بارگذاری اطلاعات کاربر با استفاده از نام کاربری به صورت آرایه
    $aUser = $u->loadByUsernameInArray($username);

    // بارگذاری اطلاعات کامل کاربر بر اساس شناسه کاربری (UID)
    $aUser = $u->load($aUser['USR_UID']);

    // ایجاد رکورد کاربر در سیستم
    @@res = $u->create($aUser);

    // دریافت شناسه کاربری از جدول USERS بر اساس نام کاربری
    $sql = "SELECT USR_UID FROM USERS WHERE USR_USERNAME = $username";
    $result = executeQuery($sql);

    // ذخیره شناسه کاربری دریافتی در متغیر global
    @@registerUID = $result[1]['USR_UID'];

    /* می‌توانید برای دیباگ از var_dump استفاده کنید
    var_dump(@@res);
    die();
    */
}
