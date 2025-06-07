<?php
// دریافت مقدار عمل (action) از درخواست POST
$act = $_POST['act'] ?? '';

// دریافت داده‌ها به صورت JSON و تبدیل به آرایه PHP
$dataInfoRaw = $_POST['dataInfo'] ?? '{}';
$dataInfo = json_decode($dataInfoRaw, true);

// دریافت کد ملی از داده‌های ورودی
$nationalID = $dataInfo['national_id'];

// اگر عمل درخواست شده بررسی وجود کاربر باشد
if ($act == "checkUserExists") {

	try {
		// مقدار نام کاربری برابر کد ملی است
		$username = $nationalID;

		// کوئری برای بررسی وجود نام کاربری در جدول USERS
		$sql = "SELECT EXISTS (SELECT 1 FROM USERS WHERE USR_USERNAME = $username) AS user_exists";

		// اجرای کوئری
		$result = executeQuery($sql);

		// مقدار بولی وجود یا عدم وجود کاربر
		@@userExists = ($result[1]['user_exists'] == 1);

		// ارسال نتیجه به صورت JSON و پایان اسکریپت
		die(json_encode(['result' => @@userExists]));

	} catch (Exception $e) {
		// در صورت بروز خطا پیام آن ارسال می‌شود
		die(json_encode(['error' => $e->getMessage()]));
	}
}
