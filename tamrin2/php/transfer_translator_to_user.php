<?php 
if(@@rad_admin_decision2=="accept"){
	$user=@@customerName;
	$result = executeQuery("SELECT USR_UID FROM USERS WHERE USR_USERNAME=$user");
  $userId=$result[1]["USR_UID"];
@@user_id=$userId;
	$order=@@name;
	$cost=@@txt_cost;
	$time=@@dat_time;
	$translatorID=@@translatorID;

	$insertSql = "
                INSERT INTO PMT_TRANSLATION (
                    TRANSLATOR_ID, COST, TIME, ORDER_NAME, STATUS,USER_ID
                ) VALUES (
                    '$translatorID', '$cost', '$time', '$order', 0,'$user'
                )
            ";
	executeQuery($insertSql);


}
