<?php
session_start();
if(isset($_SESSION["userSession"])){
	sessionHasExpired();
	
}else{
	echo(0);
}
function sessionHasExpired(){
	//5 minutes session, hence converting to seconda
	$sess_duration=300;//session time is 5 minutes equiv to 5*60=300secnds
	$time1=$_SESSION["signInTime"];//saved login time
	$time2=time();//current time

	if(($time2-$time1)>$sess_duration){//check whether tim is done
		session_unset();
		session_destroy();
		echo(-1);
	}
	else{
		echo($time2-$time1);
	}
}
?>