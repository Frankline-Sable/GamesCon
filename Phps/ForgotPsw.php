<?php
require_once("connect_db.php");

if(isset($_POST["_submitButton"])){
	$emailEntered=$_POST["_fEmail"];
	$sql="SELECT `id`, `Fullnames`, `Gender`, `Username`, `Password`, `Avatar` FROM `users` WHERE `Username`='".$emailEntered."'";
	$result=mysqli_query($conn,$sql);
	if(mysqli_num_rows($result)<1){
		die('1');
	}
	$emailMessage;
	while($row=mysqli_fetch_array($result)){
		$emailMessage="Dear ".$row["FullNames"].",\n".
		"Your Password for GamesCon was: ".$row["Password"].",\n".
		"Please take care not to forget it next time.";
	}
	// use wordwrap() if lines are longer than 70 characters
	$emailMessage=wordwrap($emailMessage,70);

	// send email
	$status=mail($emailEntered,"Subject: Recover Your Account",$emailMessage);
	if(!$status){
		die('2');
	}
	else{
		echo('0');
	}
}
else{
	echo("No 'POST' operation detected!");
}

mysqli_close($conn);
?>