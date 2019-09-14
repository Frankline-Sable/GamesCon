<?php

session_start();

$cookieName1="userCookie";
$cookieName2="nameCookie";

	//1: First we check whether there is a session, if none we check cookie then we redirect the user to the signin.html page'(Therefore return int 1)
if(isset($_SESSION["userSession"])){//checking whether session is not null
	//2: Second, we fetch the session data and return it in json array, for more information look on ajax & json
	$array_Holder=array();
	array_push($array_Holder,array("_username"=>$_SESSION["userSession"],"_fullname"=>$_SESSION["nameSession"]));
	echo(json_encode(array("sessionData"=>$array_Holder)));//echo the json array

	//3: Not that in no circumstances have we referred to the db, hence this saves loading time memory
}
else if(isset($_COOKIE[$cookieName1])){
	createSession($_COOKIE[$cookieName1],$_COOKIE[$cookieName2]);
}
else{
    echo("0");
}

function createSession($user,$name){
	$_SESSION["nameSession"]=$name;
	$_SESSION["userSession"]=$user;
	$_SESSION["signInTime"] = date("M/d/Y g:i:sa");
	
    $array_Holder=array();
	array_push($array_Holder,array("_username"=>$_SESSION["userSession"],"_fullname"=>$_SESSION["nameSession"]));
	echo(json_encode(array("sessionData"=>$array_Holder)));
}
?>