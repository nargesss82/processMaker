<?php 
//var_dump("test");
//die();
$parentCaseId = isset(@@customer_case_id) ? @@customer_case_id : null;
//var_dump($parentCaseId);
//die();
if (!empty($parentCaseId)) {
	$customer_username=@@customerName;
	$fileUID=@@translationFileUids;
	$fileName=@@translationFileNames;
	var_dump($fileName);
	@@name=$fileName[0]['name'];
	//var_dump(@@name);
	//die();
	var_dump($customer_username);
	var_dump($fileUID);	
	var_dump($fileName);	
	var_dump($parentCaseId);
	//die();
	


}
@@translatorID=@@USER_LOGGED;
var_dump(@@PROCESS);
//die();


