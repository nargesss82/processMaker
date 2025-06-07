<?php 
// دریافت نام کاربری و رمز عبور از متغیرهای فرم (Web Entry یا Trigger)
$username = @@txt_username;
$password = @@txt_password;

// بررسی اینکه آیا کاربری با این نام کاربری قبلاً در سیستم ثبت شده یا نه
$sql = "SELECT EXISTS (SELECT 1 FROM USERS WHERE USR_USERNAME ='$username') AS user_exists";
$result = executeQuery($sql);

// نتیجه بررسی وجود کاربر (0 یعنی وجود ندارد، 1 یعنی وجود دارد)
@@userExists = ($result[1]['user_exists']);

if (@@userExists == 0) {
    // اگر کاربر وجود ندارد، با استفاده از تابع PMFCreateUser ایجاد می‌شود
    // آرگومان‌ها: نام کاربری، رمز عبور، نام، نام خانوادگی، ایمیل، نقش (ROLE)
    // در اینجا به صورت پیش‌فرض با نقش `PROCESSMAKER_USER` و نام ثابت f/l ایجاد می‌شود
    @%result = PMFCreateUser($username, $password, 'f', 'l', 'em@gmail.com', 'PROCESSMAKER_USER');
    // برای تست می‌توان خروجی را چاپ کرد:
    // var_dump(@%result); die();
}

// بارگذاری کلاس مدیریت کاربران از ProcessMaker
require_once 'classes/model/Users.php';

// ایجاد نمونه‌ای از کلاس Users
$u = new Users();

// دریافت اطلاعات کاربر به صورت آرایه، با استفاده از نام کاربری
$aUser = $u->loadByUsernameInArray($username);

// بارگذاری اطلاعات کامل کاربر از دیتابیس با استفاده از USR_UID
$aUser = $u->load($aUser['USR_UID']);

// اجرای متد create دوباره روی شیء کاربر (ممکن است برای به‌روزرسانی اطلاعات استفاده شود)
@@res = $u->create($aUser);

// بازیابی مجدد شناسه کاربر (USR_UID) برای ذخیره در متغیر فرآیند
$sql = "SELECT USR_UID FROM USERS WHERE USR_USERNAME ='$username'";
$result = executeQuery($sql);

// ذخیره شناسه کاربر در متغیر فرآیند جهت استفاده در مراحل بعدی
@@registerUID = $result[1]['USR_UID'];

// برای تست مقدار خروجی create (اگر لازم باشد):
// var_dump(@@res); die();
