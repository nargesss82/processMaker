<?php
// دریافت مقدار عمل (action) از درخواست POST
$act = $_POST['act'] ?? '';

// دریافت داده‌های ارسال شده به صورت JSON و تبدیل به آرایه PHP
$dataInfoRaw = $_POST['dataInfo'] ?? '{}';
$dataInfo = json_decode($dataInfoRaw, true);

// گرفتن مقدار کد ملی از داده‌ها
$nationalID = $dataInfo['national_id'];

// اگر عمل درخواست شده بررسی وجود کاربر باشد
if ($act == "checkUserExists") {

	try {
		// مقدار نام‌کاربری برابر با کد ملی در نظر گرفته می‌شود
		$username = $nationalID;

		// شناسه کاربر فعلی (برای کنار گذاشتن خود کاربر از بررسی)
		$userId = @@USER_LOGGED;

		// کوئری SQL برای بررسی وجود کاربری با نام‌کاربری مشخص به جز کاربر جاری
		$sql = "SELECT EXISTS (
            SELECT 1 FROM USERS 
            WHERE USR_USERNAME = '$username' AND USR_UID != '$userId'
        ) AS user_exists";

		// اجرای کوئری
		$result = executeQuery($sql);

		// مقدار بولی وجود یا عدم وجود کاربر
		@@userExists = ($result[1]['user_exists'] == 1);

		// ارسال نتیجه به صورت JSON و پایان اسکریپت
		die(json_encode(['result' => @@userExists]));

	} catch (Exception $e) {
		// در صورت بروز خطا، پیام خطا را ارسال می‌کند
		die(json_encode(['error' => $e->getMessage()]));
	}
}
