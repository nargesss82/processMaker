<?php 


// دریافت شناسه کیس مشتری (parent case) از متغیر سراسری customer_case_id
// اگر این متغیر تعریف شده باشد مقدارش به $parentCaseId اختصاص داده می‌شود، در غیر اینصورت null می‌شود
$parentCaseId = isset(@@customer_case_id) ? @@customer_case_id : null;



// بررسی اینکه آیا شناسه کیس والد وجود دارد و خالی نیست
if (!empty($parentCaseId)) {
	// دریافت نام کاربری مشتری از متغیر سراسری customerName
	$customer_username = @@customerName;

	// دریافت شناسه‌های فایل‌های ترجمه (مقدار احتمالا آرایه‌ای از UID ها)
	$fileUID = @@translationFileUids;

	// دریافت نام فایل‌های ترجمه (احتمالا آرایه‌ای از اطلاعات فایل‌ها)
	$fileName = @@translationFileNames;

	// مقداردهی اولین نام فایل ترجمه به متغیر سراسری @@name برای استفاده در بخش‌های دیگر
	// فرض بر این است که $fileName یک آرایه چندبعدی بوده و عنصر 'name' نام فایل است
	@@name = $fileName[0]['name'];

	// var_dump(@@name);  // نمایش مقدار متغیر سراسری @@name (کامنت شده)
	// die();             // توقف اجرای کد (کامنت شده)

	// نمایش مقادیر برای دیباگ و بررسی صحت مقادیر
	var_dump($customer_username);
	var_dump($fileUID);	
	var_dump($fileName);	
	var_dump($parentCaseId);

	// die();  // توقف اجرای کد برای بررسی خروجی (در صورت نیاز، فعلا کامنت شده)
}
