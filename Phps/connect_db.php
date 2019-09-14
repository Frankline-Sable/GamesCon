<?php
$server="localhost";
$user="root";
$pass="";
$database="GamesCon";

$conn=mysqli_connect($server,$user,$pass,$database);
if($conn===FALSE){
	die("Error, Connecting to database<br> Because of: ".mysqli_connect_error());
}
?>