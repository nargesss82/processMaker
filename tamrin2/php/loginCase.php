<?php 

// گرفتن شناسه کاربری ثبت شده (registerUID) از متغیرهای ProcessMaker
$userUID = @@registerUID;

// نمایش شناسه کاربری برای بررسی و دیباگ
var_dump($userUID);

// تعریف آرایه متغیرها برای ارسال به کیس جدید
$vars = array(
	// شناسه کیس سفارش فعلی (کیس جاری)
	'order_case_id'     => @@APPLICATION,
	
	// شناسه یکتای کاربر ثبت شده (UID)
	'customer_uid'      => $userUID
);

// نمایش آرایه متغیرها برای بررسی مقدارها
var_dump($vars);

// ایجاد یک کیس جدید با تابع PMFNewCase
// پارامترها:
// 1- شناسه فرآیند (Process UID)
// 2- شناسه کاربری که مالک کیس جدید خواهد بود (User UID)
// 3- شناسه وظیفه (Task UID) که کیس باید از آن شروع شود
// 4- آرایه متغیرهای انتقالی به کیس جدید
// 5- وضعیت وظیفه (TO_DO به معنی قابل انجام)
$newCaseId = PMFNewCase(
	'759512857682f461f79a579054495571',  // Process UID (شناسه فرآیند مقصد)
	$userUID,                            // User UID (مالک کیس جدید)
	'86055354368420618263955095947380', // Task UID (وظیفه شروع)
	$vars,                              // متغیرهای منتقل شده به کیس جدید
	"TO_DO"                            // وضعیت شروع وظیفه
);

// ذخیره شناسه کیس جدید ایجاد شده در متغیر سراسری @@order_case_id
@@order_case_id = $newCaseId;

// نمایش نتیجه ساخت کیس جدید برای دیباگ
var_dump("Case created for user $userUID: ", $newCaseId);

// متوقف کردن اجرای کد در اینجا برای بررسی خروجی (در صورت نیاز)
// die();


