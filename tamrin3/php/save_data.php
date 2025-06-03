<?php 
//die(json_encode(['POST' => $_POST]));
$act = $_POST['act'] ?? '';
$dataInfoRaw = $_POST['dataInfo'] ?? '[]';
$dataRows = json_decode($dataInfoRaw, true); // الان این یه آرایه از ردیف‌هاست
//die(json_encode(['dataRows' => $dataRows]));
if ($act == "saveData") {
    try {
        foreach ($dataRows as $row) {
            $name = $row[0];
            $addres = $row[1];
            $doc = $row[2];
            $score = $row[3];
            $rate = $row[4];
            $sum = $row[5];
            $insertSql = "
                INSERT INTO PMT_DATAS (
                    NAME, ADDRES, DOC, SCORE, RATE, SUM
                ) VALUES (
                    '$name', '$addres', '$doc', '$score', '$rate', '$sum'
                )
            ";
            executeQuery($insertSql); // بدون stmt، چون در PM triggers نیازی نیست
            //die(json_encode(['exe' => executeQuery($insertSql)]));
		}

        die(json_encode(['result' => 'ok']));
    } catch (Exception $e) {
        die(json_encode(['error' => $e->getMessage()]));
    }
}
