<?php 
// بررسی اینکه تصمیم مدیر دوم (rad_admin_decision2) برابر "accept" باشد
if (@@rad_admin_decision2 == "accept") {
    // دریافت نام کاربری مشتری از متغیر سراسری
    $user = @@customer_username;
    var_dump($user);  // نمایش نام کاربری برای دیباگ
    //die();          // در صورت نیاز برای توقف اجرای کد بعد از نمایش

    // اجرای کوئری برای دریافت شناسه یکتا (USR_UID) کاربر از جدول USERS بر اساس نام کاربری
    $result = executeQuery("SELECT USR_UID FROM USERS WHERE USR_USERNAME='$user'");
    // استخراج شناسه کاربر از اولین ردیف نتیجه
    $userId = $result[1]["USR_UID"];
    // ذخیره شناسه کاربر در متغیر سراسری user_id
    @@user_id = $userId;

    // دریافت سایر داده‌ها از متغیرهای سراسری
    $order         = @@file_name;         // نام فایل سفارش
    $cost          = @@txt_cost;          // هزینه سفارش
    $time          = @@dat_time;          // زمان سفارش
    $translatorID  = @@translatorId;      // شناسه مترجم
    $id            = @@customer_case_id;  // شناسه کیس مشتری
    $order_case_id = @@order_case_id;     // شناسه کیس سفارش

    // var_dump($translatorID); die();   // برای دیباگ شناسه مترجم (کامنت شده)

    // ساخت رشته کوئری SQL برای درج داده‌های جدید در جدول PMT_TRANSLATION
    $insertSql = "
        INSERT INTO PMT_TRANSLATION (
            TRANSLATOR_ID, COST, TIME, ORDER_NAME, STATUS, USER_ID, CASEID
        ) VALUES (
            '$translatorID', '$cost', '$time', '$order', 0, '$user', '$order_case_id'
        )
    ";
    // اجرای کوئری درج
    executeQuery($insertSql);


}
