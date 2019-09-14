<?php

session_start();

if(isset($_SESSION["uploadStatus"])){
	echo($_SESSION["uploadStatus"]);
}
else{
	echo(0);
}
?>