<?php
require_once("connect_db.php");

if(isset($_POST["_submitButton"])){
	
	$username=validate_Input($_POST["_userField"]);
	$password=validate_Input($_POST["_passField"]);
	
	$sql="SELECT `id`, `Fullnames`, `Gender`,  `Username`, `Password`, `Avatar` FROM `users` WHERE `Username`='".$username."' && `Password`='".$password."'";
	
	$result=mysqli_query($conn,$sql);
	$arrayResult=array();
	
	if(mysqli_num_rows($result)>0){
		
		while($rows=mysqli_fetch_array($result)){
			
			/*=====================================================================================*/
			//HANDLING CASES, CASE SENSTIVE MATCH
			if(!(preg_match("/".$username."/",$rows["Username"]))){
				die("1");
			}
			else if(!(preg_match("/".$password."/",$rows["Password"]))){
				die("1");
			}
			/*=====================================================================================*/
			
			array_push($arrayResult, array("_userID"=>$rows["id"], "_userFullNames"=>$rows["Fullnames"], "_userGender"=>$rows["Gender"], "_userEmail"=>$rows["Username"], "_userPass"=>$rows["Password"],"_avatar"=>$rows["userAvatar"]));
			
			$user=$rows["Username"];
			$names=$rows["Fullnames"];
			$pass=$rows["Password"];
			$img=$rows["userAvatar"];
		}
	echo(json_encode(array("userDATA"=>$arrayResult)));
	createCookie($user, $names);
	}
	else{
		echo('1');//Unable to find the current user in the system
	}
	
}else{
	echo("No 'POST' operation detected!");
}

mysqli_close($conn);

function createCookie($user,$name){
	$cookieName1="userCookie";
	$cookieName2="nameCookie";
	
	setcookie($cookieName1, $user,time() + (86400 * 30),"/");	// 86400sec = 1 day
	setcookie($cookieName2, $name,time() + (86400 * 30),"/");	// 86400sec = 1 day
	
	createSession($user, $name);
}
function createSession($user, $name, $pass){
	session_start();
	$_SESSION["userSession"]=$user;
	$_SESSION["nameSession"]=$name;
	$_SESSION["signInTime"]=time();//Storing the current time.
}
function validate_Input($data) {
  $data = trim($data);
  $data = stripslashes($data);
  $data = htmlspecialchars($data);
  return $data;
}
?>