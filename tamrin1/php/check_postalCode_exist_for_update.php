<?php
// دریافت مقدار عمل ارسالی از فرم یا AJAX
$act = $_POST['act']??'' ;

// دریافت داده‌های ارسال شده به صورت JSON و تبدیل به آرایه PHP
$dataInfoRaw = $_POST['dataInfo'] ?? '{}';
$dataInfo = json_decode($dataInfoRaw, true);

// گرفتن مقدار کدپستی از داده‌ها
$postalCode = $dataInfo['postal_code'] ;

// بررسی نوع عمل درخواست شده
if ($act == "checkPostalCodeExists") {

	try {
		// شناسه کاربر جاری (در ProcessMaker به شکل خاصی تعریف شده)
		$userId=@@USER_LOGGED;

		// کوئری SQL برای بررسی وجود کدپستی در جدول USERS
		// با این شرط که کاربر فعلی را در نظر نگیرد (USR_UID != '$userId')
		$sql = "SELECT EXISTS (
            SELECT 1 FROM USERS 
            WHERE USR_ADDRESS = '$postalCode' AND USR_UID != '$userId'
        ) AS postalCode_exists";

		// اجرای کوئری و گرفتن نتیجه
		$result = executeQuery($sql);

		// مقدار بولی وجود یا عدم وجود کدپستی
		@@postalCodeExists = ($result[1]['postalCode_exists'] == 1);

		// ارسال نتیجه به صورت JSON و پایان اسکریپت
		die (json_encode(['result'=>@@postalCodeExists]));

	} catch (Exception $e) {
		// اگر خطایی رخ دهد، پیام خطا را به صورت JSON ارسال می‌کند
		die(json_encode(['error'=>$e->getMessage()]));
	}
}
