<?php 
// بررسی داده‌های ارسالی با متد POST (برای دیباگ)
// die(json_encode(['POST' => $_POST]));

// خواندن مقدار پارامتر 'act' از درخواست POST (در صورت نبود، مقدار پیش‌فرض رشته خالی)
$act = $_POST['act'] ?? '';

// بررسی مقدار act برای اجرای عملیات مربوطه
if ($act == "getData") {
	try {
		// نوشتن کوئری برای دریافت داده‌ها از جدول PMT_DATAS
		$query = "SELECT NAME, ADDRES, DOC, SCORE, RATE, SUM FROM PMT_DATAS";

		// اجرای کوئری و گرفتن نتیجه (تابع  executeQuery)
		$result = executeQuery($query);

		// آرایه‌ای برای نگهداری داده‌ها جهت ارسال به سمت کلاینت
		$data = [];

		// بررسی اینکه نتیجه معتبر و آرایه‌ای است
		if (is_array($result)) {
			foreach ($result as $row) {
				// افزودن هر ردیف به آرایه نهایی به صورت آرایه‌ای از مقادیر
				$data[] = [
					$row['NAME'],
					$row['ADDRES'],
					$row['DOC'],
					$row['SCORE'],
					$row['RATE'],
					$row['SUM']
				];
			}
		}
		
		// ارسال داده‌ها به صورت JSON و پایان اجرای اسکریپت
		die(json_encode(['data' => $data]));

		// جایگزین ممکن در صورت نیاز به پاسخ ساده‌تر
		// die(json_encode(['result' => 'ok']));

	} catch (Exception $e) {
		// در صورت بروز خطا در اجرای کوئری، ارسال پیام خطا به صورت JSON
		die(json_encode(['error' => $e->getMessage()]));
	}
}
