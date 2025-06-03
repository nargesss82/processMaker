<?php
$act = $_POST['act']??'' ;

// دریافت dataInfo و تبدیل به آرایه
$dataInfoRaw = $_POST['dataInfo'] ?? '{}';
$dataInfo = json_decode($dataInfoRaw, true);

$postalCode = $dataInfo['postal_code'] ;
//die(json_encode(['act'=>$act]));
if ($act == "checkPostalCodeExists") {


	try {
		


		
		$postalCode = $postalCode;
		$sql = "SELECT EXISTS (SELECT 1 FROM USERS WHERE USR_ADDRESS =$postalCode) AS postalCode_exists";
		$result = executeQuery($sql);
		@@postalCodeExists = ($result[1]['postalCode_exists'] == 1);
		die (json_encode(['result'=>@@postalCodeExists]));
		

	} catch (Exception $e) {
		die(json_encode(['error'=>$e->getMessage()]));
	}
}








