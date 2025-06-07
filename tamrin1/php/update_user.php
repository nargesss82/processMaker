<?php
// گرفتن مقدار وضعیت از دراپ‌داون وضعیت
$status = @@drp_status;

// بسته به مقدار وضعیت، گرفتن اطلاعات مربوط به نام، نام خانوادگی، نام کاربری و رمز عبور
if ($status == 0) {
    // وقتی وضعیت 0 است، اطلاعات از فیلدهای معمولی گرفته می‌شود
    $firstname = @@txt_firstName;
    $lastname = @@txt_lastName;
    $username = @@txt_nationalCode;
    $password = @@txt_phone;
} else if ($status == 1) {
    // وقتی وضعیت 1 است، اطلاعات از فیلدهای حقوقی گرفته می‌شود
    $firstname = @@txt_legalFirstname;
    $lastname = @@txt_legalLastname;
    $username = @@txt_legalNationalCode;
    $password = @@txt_legalPhone;
}

// به‌روزرسانی اطلاعات کاربر جاری با استفاده از تابع PMFUpdateUser
@@return = PMFUpdateUser(@@USER_LOGGED, $username, $firstname, $lastname, $password);
