<?php
$status=@@drp_status;
if($status==0){
	$firstname=@@txt_firstName;
	$lastname=@@txt_lastName;
	$username=@@txt_nationalCode;
	$password=@@txt_phone;
}else if($status==1){
	$firstname=@@txt_legalFirstname;
	$lastname=@@txt_legalLastname;
	$username=@@txt_legalNationalCode;
	$password=@@txt_legalPhone;
}

$postalcode=@@txt_postalCode;

@%result = PMFCreateUser($username, $password, $firstname,$lastname,'em@gmail.com','PROCESSMAKER_USER');
//var_dump(@%result);
//die();
if (@%result) {
	executeQuery("UPDATE USERS SET USR_ADDRESS = '$postalcode' WHERE USR_USERNAME = '$username'");
	require_once 'classes/model/Users.php';
	$u = new Users();
	$aUser = $u->loadByUsernameInArray($username);
	$aUser = $u->load($aUser['USR_UID']);
	@@res = $u->create($aUser);
	$sql = "SELECT USR_UID FROM USERS WHERE USR_USERNAME =$username";

	$result = executeQuery($sql);

	@@registerUID =$result[1]['USR_UID'];
	/*var_dump(@@res);
die();*/
}

