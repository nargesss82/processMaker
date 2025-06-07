<?php  
// دریافت نام کاربری و کلمه عبور از متغیرهای سراسری (ورودی فرم یا ورودی کاربر)
$username = @@txt_username;
$password = @@txt_password;

// بررسی وجود کاربر با نام کاربری داده شده در جدول USERS
$sql = "SELECT EXISTS (SELECT 1 FROM USERS WHERE USR_USERNAME ='$username') AS user_exists";
$result = executeQuery($sql);

// ذخیره نتیجه بررسی وجود کاربر در متغیر سراسری userExists (1 اگر وجود داشته باشد، 0 اگر نه)
@@userExists = ($result[1]['user_exists']);

// اگر کاربر وجود نداشت (userExists برابر 0 بود)، ایجاد کاربر جدید با تابع PMFCreateUser
if (@@userExists == 0) {
    // ساخت کاربر جدید با اطلاعات اولیه:
    // username, password, 'f' (نام کوچک)، 'l' (نام خانوادگی)، ایمیل نمونه و نقش PROCESSMAKER_USER
    @%result = PMFCreateUser($username, $password, 'f', 'l', 'em@gmail.com', 'PROCESSMAKER_USER');
}
//var_dump(@%result);die();  // نمایش نتیجه ایجاد کاربر برای دیباگ و توقف اجرا (کامنت شده)

// بارگذاری کلاس Users جهت استفاده از متدهای بارگذاری کاربر
require_once 'classes/model/Users.php';

// ایجاد نمونه از کلاس Users
$u = new Users();

// بارگذاری اطلاعات کاربر به صورت آرایه با استفاده از نام کاربری
$aUser = $u->loadByUsernameInArray($username);

// بارگذاری کامل اطلاعات کاربر با استفاده از شناسه کاربری (USR_UID) که از مرحله قبل گرفته شده است
$aUser = $u->load($aUser['USR_UID']);

// ایجاد یا ثبت کاربر (احتمالاً به‌روزرسانی یا ثبت در سیستم محلی) و ذخیره نتیجه در متغیر سراسری res
@@res = $u->create($aUser);

// بازیابی شناسه یکتا (USR_UID) کاربر ایجاد شده یا موجود از جدول USERS
$sql = "SELECT USR_UID FROM USERS WHERE USR_USERNAME ='$username'";
$result = executeQuery($sql);

// ذخیره شناسه یکتا کاربر در متغیر سراسری registerUID
@@registerUID = $result[1]['USR_UID'];

/*var_dump(@@res);
die();*/  // نمایش نتیجه عملیات و توقف اجرا برای دیباگ (کامنت شده)
