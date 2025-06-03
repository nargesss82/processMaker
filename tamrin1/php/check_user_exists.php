<?php
$act = $_POST['act']??'' ;

// دریافت dataInfo و تبدیل به آرایه
$dataInfoRaw = $_POST['dataInfo'] ?? '{}';
$dataInfo = json_decode($dataInfoRaw, true);

$nationalID = $dataInfo['national_id'] ;
//die(json_encode(['act'=>$act]));
if ($act == "checkUserExists") {


	try {
		


		
		$username = $nationalID;
		$sql = "SELECT EXISTS (SELECT 1 FROM USERS WHERE USR_USERNAME =$username) AS user_exists";
		$result = executeQuery($sql);
		@@userExists = ($result[1]['user_exists'] == 1);
		die (json_encode(['result'=>@@userExists]));
		

	} catch (Exception $e) {
		die(json_encode(['error'=>$e->getMessage()]));
	}
}








