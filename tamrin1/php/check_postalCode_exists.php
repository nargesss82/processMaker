<?php
// دریافت مقدار عمل (action) از درخواست POST
$act = $_POST['act'] ?? '';

// دریافت داده‌های ارسال شده به صورت JSON و تبدیل به آرایه PHP
$dataInfoRaw = $_POST['dataInfo'] ?? '{}';
$dataInfo = json_decode($dataInfoRaw, true);

// گرفتن مقدار کدپستی از داده‌ها
$postalCode = $dataInfo['postal_code'];

// اگر عمل درخواست شده بررسی وجود کدپستی باشد
if ($act == "checkPostalCodeExists") {

	try {
		// مقدار کدپستی دوباره در متغیر ذخیره می‌شود (در واقع تکرار است)
		$postalCode = $postalCode;

		// کوئری SQL برای بررسی وجود کدپستی در جدول USERS
		$sql = "SELECT EXISTS (SELECT 1 FROM USERS WHERE USR_ADDRESS = $postalCode) AS postalCode_exists";

		// اجرای کوئری
		$result = executeQuery($sql);

		// مقدار بولی وجود یا عدم وجود کدپستی
		@@postalCodeExists = ($result[1]['postalCode_exists'] == 1);

		// ارسال نتیجه به صورت JSON و پایان اسکریپت
		die(json_encode(['result' => @@postalCodeExists]));

	} catch (Exception $e) {
		// در صورت بروز خطا، پیام خطا را ارسال می‌کند
		die(json_encode(['error' => $e->getMessage()]));
	}
}
