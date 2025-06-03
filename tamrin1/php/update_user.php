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

@@return = PMFUpdateUser(@@USER_LOGGED,$username,$firstname,$lastname,$password);


