<?php 
$username=@@txt_username;
$password=@@txt_password;
$sql = "SELECT EXISTS (SELECT 1 FROM USERS WHERE USR_USERNAME ='$username') AS user_exists";
$result = executeQuery($sql);
@@userExists = ($result[1]['user_exists']);
if(@@userExists==0){
	@%result = PMFCreateUser($username, $password, 'f','l','em@gmail.com','PROCESSMAKER_USER');}
//var_dump(@%result);die();

require_once 'classes/model/Users.php';
$u = new Users();
$aUser = $u->loadByUsernameInArray($username);
$aUser = $u->load($aUser['USR_UID']);
@@res = $u->create($aUser);
$sql = "SELECT USR_UID FROM USERS WHERE USR_USERNAME ='$username'";

$result = executeQuery($sql);

@@registerUID =$result[1]['USR_UID'];
/*var_dump(@@res);
die();*/
