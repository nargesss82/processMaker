<?php 
$act = $_POST['act'] ?? '';
//die(json_encode(['act' => $act]));
if ($act == "getData") {
	try {
		$username=@@customerName;
		$result = executeQuery("SELECT USR_UID FROM USERS WHERE USR_USERNAME=$username");
		$userId=$result[1]["USR_UID"];
		@@user_id=$userId;
		//var_dump($userId);
		//die();
		//var_dump($username);
		//die();
		$query = "SELECT * FROM PMT_TRANSLATION WHERE USER_ID=$username";
		$result = executeQuery($query);
		//var_dump($result);
		//die();
		$data = [];

		if (is_array($result)) {
			foreach ($result as $row) {
				$data[] = [
					$row['ID'],
					$row['ORDER_NAME'],
					$row['COST'],
					$row['TIME'],
				];
			}
		}
		die(json_encode(['data' => $data]));
	} catch (Exception $e) {
		die(json_encode(['error' => $e->getMessage()]));
	}
}