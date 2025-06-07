<?php 
// بررسی داده‌های POST برای دیباگ (در صورت نیاز می‌توان فعال کرد)
// die(json_encode(['POST' => $_POST]));

// گرفتن مقدار پارامتر act از درخواست POST (در صورت نبودن، رشته خالی در نظر گرفته می‌شود)
$act = $_POST['act'] ?? '';

// گرفتن داده‌های دریافتی به صورت رشته JSON (آرایه‌ای از ردیف‌ها)
$dataInfoRaw = $_POST['dataInfo'] ?? '[]';

// تبدیل رشته JSON به آرایه PHP
$dataRows = json_decode($dataInfoRaw, true); // حالا dataRows یک آرایه شامل ردیف‌ها است

// بررسی اینکه آیا عملیات مورد نظر ذخیره‌سازی داده‌هاست
if ($act == "saveData") {
try {
    // پیمایش هر ردیف از داده‌ها
    foreach ($dataRows as $row) {
        // استخراج مقادیر هر ستون از ردیف
        $name = $row[0];   // ستون اول: نام
        $addres = $row[1]; // ستون دوم: آدرس
        $doc = $row[2];    // ستون سوم: سند
        $score = $row[3];  // ستون چهارم: نمره
        $rate = $row[4];   // ستون پنجم: ضریب
        $sum = $row[5];    // ستون ششم: حاصل‌ضرب نمره × ضریب

        // آماده‌سازی کوئری INSERT برای ذخیره اطلاعات در جدول
        $insertSql = "
            INSERT INTO PMT_DATAS (
                NAME, ADDRES, DOC, SCORE, RATE, SUM
            ) VALUES (
                '$name', '$addres', '$doc', '$score', '$rate', '$sum'
            )
        ";

        // اجرای کوئری (تابع executeQuery به صورت پیش‌فرض در ProcessMaker تعریف شده)
        
        executeQuery($insertSql);

        // برای دیباگ اجرای کوئری می‌توان این خط را فعال کرد
        // die(json_encode(['exe' => executeQuery($insertSql)]));
    }

    // در صورت موفقیت، پاسخ JSON مناسب باز می‌گردانیم
    die(json_encode(['result' => 'ok']));
    
} catch (Exception $e) {
    // در صورت بروز خطا، پیام خطا به صورت JSON باز می‌گردد
    die(json_encode(['error' => $e->getMessage()]));
}
}
