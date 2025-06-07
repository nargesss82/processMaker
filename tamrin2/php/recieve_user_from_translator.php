<?php 
// var_dump(@@customer_uid); die();  // نمایش شناسه یکتای مشتری برای دیباگ و توقف اجرای کد (فعلا کامنت شده)

// دریافت مقدار عمل (action) از داده‌های ارسالی POST، اگر وجود نداشت رشته خالی قرار می‌دهد
$act = $_POST['act'] ?? '';

// die(json_encode(['act' => $act]));  // نمایش مقدار عمل برای دیباگ و توقف اجرای کد (کامنت شده)

// بررسی اینکه اگر عمل دریافت داده ("getData") ارسال شده باشد
if ($act == "getData") {
	try {
		// گرفتن شناسه یکتای کاربر از متغیر سراسری
		$username = @@customer_uid;

		// var_dump($username); die();  // نمایش شناسه کاربر برای دیباگ (کامنت شده)

		// اجرای کوئری برای دریافت نام کاربری (USR_USERNAME) از جدول USERS براساس شناسه کاربر (USR_UID)
		$result = executeQuery("SELECT USR_USERNAME FROM USERS WHERE USR_UID='$username'");

		// گرفتن نام کاربری از نتیجه کوئری (ایندکس 1 بخاطر اینکه احتمالا آرایه از 1 شروع می‌شود)
		$userId = $result[1]["USR_USERNAME"];

		// @@user_id = $userId;  // ذخیره نام کاربری در متغیر سراسری (کامنت شده)

		// var_dump($result); die(); // نمایش نتیجه کوئری برای دیباگ (کامنت شده)

		// گرفتن شناسه کیس جاری
		$caseId = @@APPLICATION;

		// تعریف کوئری برای دریافت داده‌های مرتبط با ترجمه از جدول PMT_TRANSLATION
		// شرط‌ها: USER_ID مطابق نام کاربری گرفته شده و CASEID مطابق کیس جاری
		$query = "SELECT * FROM PMT_TRANSLATION WHERE USER_ID='$userId' and CASEID='$caseId'";

		// اجرای کوئری بالا
		$result = executeQuery($query);

		// آرایه خالی برای ذخیره نتایج نهایی که به صورت آرایه‌های تو در تو خواهد بود
		$data = [];

		// اگر نتیجه کوئری آرایه باشد (داده‌ای برگشته باشد)
		if (is_array($result)) {
			// پیمایش هر سطر (ردیف) داده برگشتی
			foreach ($result as $row) {
				// افزودن آرایه‌ای شامل مقادیر مورد نیاز به آرایه نهایی
				$data[] = [
					$row['ID'],          // شناسه رکورد
					$row['ORDER_NAME'],  // نام سفارش
					$row['COST'],        // هزینه
					$row['TIME'],        // زمان
				];
			}
		}

		// ارسال داده‌ها به صورت JSON و پایان اسکریپت
		die(json_encode(['data' => $data]));

	} catch (Exception $e) {
		// در صورت بروز خطا، ارسال پیام خطا به صورت JSON و پایان اسکریپت
		die(json_encode(['error' => $e->getMessage()]));
	}
}
