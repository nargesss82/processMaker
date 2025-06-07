<?php 


// دریافت شناسه کیس والد (parent case) از متغیر سراسری translator_case_id
// اگر این متغیر موجود باشد مقدارش به $parentCaseId اختصاص داده می‌شود، در غیر اینصورت null می‌شود
$parentCaseId = isset(@@translator_case_id) ? @@translator_case_id : null;


// بررسی اینکه آیا شناسه کیس والد موجود و خالی نیست
if (!empty($parentCaseId)) {
	// دریافت متغیرهای مرتبط با پیشنهاد ترجمه و سفارش از متغیرهای سراسری
	$translatorID = @@translatorId;           // شناسه مترجم
	$cost         = @@cost;                   // هزینه پیشنهادی
	$time         = @@time;                   // زمان تحویل پیشنهادی
	$file_name    = @@file_name;              // نام فایل سفارش
	$username_order = @@customer_username;    // نام کاربری مشتری سفارش‌دهنده

	// نمایش مقادیر متغیرها برای دیباگ و بررسی صحت مقادیر
	var_dump($translatorID);
	var_dump($cost);	
	var_dump($time);	
	var_dump($parentCaseId);
	var_dump($file_name);
	var_dump($username_order);

	// متوقف کردن اجرای کد برای بررسی مقدار متغیرها (فعلاً کامنت شده)
	// die();
}


