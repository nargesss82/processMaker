<?php 
//die(json_encode(['POST' => $_POST]));
$act = $_POST['act'] ?? '';
//die(json_encode(['act' => $act]));
if ($act == "getData") {
	try {
		$query = "SELECT NAME, ADDRES, DOC, SCORE, RATE, SUM FROM PMT_DATAS";
		$result = executeQuery($query);
		$data = [];

		if (is_array($result)) {
			foreach ($result as $row) {
				$data[] = [
					$row['NAME'],
					$row['ADDRES'],
					$row['DOC'],
					$row['SCORE'],
					$row['RATE'],
					$row['SUM']
				];
			}
		}
		
		die(json_encode(['data' => $data]));
		//die(json_encode(['result' => 'ok']));

	} catch (Exception $e) {
		die(json_encode(['error' => $e->getMessage()]));
	}
}
