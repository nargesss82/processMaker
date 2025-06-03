<?php 
if(@@rad_admin_decision=="accept"){
	$username = @@txt_username;
	$file = @@mfi_file;

	// استخراج UID فایل‌ها
	$fileUids = [];
	if (!empty(@@mfi_file)) {
		foreach (@@mfi_file as $file) {
			if (isset($file['appDocUid'])) {
				$fileUids[] = $file['appDocUid'];
				$fileNames[] = $file['name'];

			}
		}
	}

	// UID گروه مترجمین
	$groupUID = '4157601606805538b62a4b3074562995'; 
	$aUsers = PMFGetGroupUsers($groupUID);

	// آرایه برای ذخیره کیس‌ها
	if (!is_array(@@translator_cases)) {
		@@translator_cases = [];
	}

	foreach ($aUsers as $user) {
		//var_dump($aUsers);
		$userUID = $user['USR_UID'];

		$fileUidsFormatted = [];
		foreach ($fileUids as $uid) {
			$fileUidsFormatted[] = ['appDocUid' => $uid];
		}
		$fileNamesFormatted = [];
		foreach ($fileNames as $name) {
			$fileNamesFormatted[] = ['appDocUid' => $name];
		}
		$vars = array(
			'customerName'         => $username,
			'translationFileUids'  => array_map(function($uid) { return ['appDocUid' => $uid]; }, $fileUids),
			'translationFileNames'  => array_map(function($name) { return ['name' => $name]; }, $fileNames), 
			'customer_case_id'     => @@APPLICATION
		);

		$newCaseId = PMFNewCase(
			'759512857682f461f79a579054495571',
			$userUID,
			'720622301682f46e8267d27075781787',
			$vars,
			"TO_DO");
		//$result = PMFSendVariables($newCaseId, $vars);
		//var_dump($result);

		// تست خروجی
		var_dump("Case created for user $userUID: ", $newCaseId);
		// متوقف کردن بعد از اولین ایجاد برای بررسی خروجی
	}
	//die();

}
/*var_dump("@@");
var_dump(@@USER_LOGGED);
var_dump(@@USR_USERNAME);
die();*/