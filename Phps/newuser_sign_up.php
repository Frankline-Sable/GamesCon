<?php
require_once("connect_db.php");

if(isset($_POST["_submitButton"])){
	$fullName=validate_Input($_POST["_nameField"]);
	$gender=validate_Input($_POST["_genderRadio"]);
	$username=validate_Input($_POST["_userField"]);
	$password=validate_Input($_POST["_password"]);
	
	check_UserExist($username);
    
	$sql="INSERT INTO `users`(`id`, `Fullnames`, `Gender`,  `Username`, `Password`, `Avatar`) VALUES (NULL,'".$fullName."','".$gender."','".$username."','".$password."',NULL)";
	
	if(mysqli_query($conn,$sql)===FALSE){
		die("1");//Failed Inserting Data
	}
	else{
		echo("3");//Success inserting data in db
        
	}
}
else{
	echo("No 'POST' operation detected!");
}
mysqli_close($conn);

function check_UserExist($username){
	global $conn;
	
	$sql="SELECT `id`, `Fullnames`,`Username`, `Password` FROM `users` WHERE `Username`='".$username."'";
	$result=mysqli_query($conn,$sql);
	
	if(mysqli_num_rows($result)>0){
		die("2");//The user already Exists in db
	}
}
function validate_Input($data) {
  $data = trim($data);
  $data = stripslashes($data);
  $data = htmlspecialchars($data);
  return $data;
}




?>