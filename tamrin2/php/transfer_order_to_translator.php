<?php 
// بررسی اینکه تصمیم مدیر (rad_admin_decision) برابر "accept" باشد
if (@@rad_admin_decision == "accept") {
	// دریافت نام کاربری از متغیر سراسری txt_username
	$username = @@txt_username;

	// دریافت آرایه فایل‌ها از متغیر سراسری mfi_file
	$file = @@mfi_file;

	// دریافت شناسه کیس سفارش
	$order_case_id = @@order_case_id;

	// استخراج UID فایل‌ها در آرایه جداگانه
	$fileUids = [];
	$fileNames = []; // آرایه جدا برای نام فایل‌ها

	if (!empty(@@mfi_file)) {
		// پیمایش روی هر فایل موجود در mfi_file
		foreach (@@mfi_file as $file) {
			// اگر کلید 'appDocUid' برای فایل وجود داشته باشد
			if (isset($file['appDocUid'])) {
				$fileUids[] = $file['appDocUid'];   // افزودن UID فایل به آرایه
				$fileNames[] = $file['name'];       // افزودن نام فایل به آرایه
			}
		}
	}

	// UID گروه مترجمین که کیس‌ها به آنها ارسال می‌شود
	$groupUID = '4157601606805538b62a4b3074562995'; 

	// دریافت لیست کاربران گروه مترجمین با استفاده از تابع PMFGetGroupUsers
	$aUsers = PMFGetGroupUsers($groupUID);

	// اطمینان از اینکه متغیر translator_cases یک آرایه است، در غیر اینصورت مقداردهی اولیه آرایه
	if (!is_array(@@translator_cases)) {
		@@translator_cases = [];
	}

	// پیمایش روی هر کاربر در گروه مترجمین
	foreach ($aUsers as $user) {
		// دریافت شناسه یکتای کاربر
		$userUID = $user['USR_UID'];

		// قالب‌بندی آرایه‌های UID فایل‌ها برای ارسال به متغیرها
		$fileUidsFormatted = [];
		foreach ($fileUids as $uid) {
			$fileUidsFormatted[] = ['appDocUid' => $uid];
		}

		// قالب‌بندی آرایه نام فایل‌ها (اینجا احتمالا اشتباه است چون 'appDocUid' به جای 'name' نوشته شده)
		$fileNamesFormatted = [];
		foreach ($fileNames as $name) {
			$fileNamesFormatted[] = ['name' => $name];  // اصلاح کلید به 'name'
		}

		// آرایه متغیرهایی که به کیس جدید فرستاده می‌شود
		$vars = array(
			'customerName'         => $username,
			'translationFileUids'  => $fileUidsFormatted, // آرایه UIDهای فایل‌ها با ساختار مورد نیاز
			'translationFileNames' => $fileNamesFormatted, // آرایه نام فایل‌ها با ساختار درست
			'customer_case_id'     => @@APPLICATION,       // شناسه کیس مشتری
			'order_case_id'        => $order_case_id       // شناسه کیس سفارش
			//'translatorID'       => $userUID             // این خط کامنت شده است
		);

		// ایجاد کیس جدید برای هر مترجم در گروه با استفاده از PMFNewCase
		$newCaseId = PMFNewCase(
			'759512857682f461f79a579054495571',  // UID پروسه
			$userUID,                            // UID کاربر هدف (مترجم)
			'720622301682f46e8267d27075781787', // UID فرم یا مرحله
			$vars,                              // متغیرهای ارسالی به کیس
			"TO_DO"                            // وضعیت کیس جدید
		);

		// نمایش آرایه متغیرهای ارسال شده برای دیباگ
		var_dump($vars);

		// var_dump($aUsers); die();  // (کامنت شده) نمایش لیست کاربران و توقف اجرای کد

		// نمایش پیام و شناسه کیس ایجاد شده برای هر کاربر
		var_dump("Case created for user $userUID: ", $newCaseId);

		// متوقف کردن بعد از اولین ایجاد برای بررسی خروجی (اگر نیاز باشد، می‌توانید این خط را فعال کنید)
		// die();
	}
	//die();  // توقف اجرای کد بعد از ایجاد کیس‌ها (کامنت شده)
}


