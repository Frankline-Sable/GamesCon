<?php

require_once("connect_db.php");

if($_SERVER["REQUEST_METHOD"]=='POST'){
	$product_operation=$_POST["operation"];
	$product_id=$_POST["id"];
    $shopper=$_POST["shopper"];
	
	if($product_operation=="true"){ //if the customer is buying an item
		$product_name=$_POST["name"];
		$product_price=$_POST["price"];
		$product_count;
	
		$sql="SELECT  `count` FROM `boughtitems` WHERE id='".$product_id."' && shopper='".$shopper."'";
	
		$result=$conn->query($sql);
		$res=array();

		if($result->num_rows>0){
			while($rows=$result->fetch_array()){
				$product_count=$rows["count"];
				$product_count++;
				$sql="UPDATE `boughtItems` SET `count`=".$product_count." WHERE id='".$product_id."' && shopper='".$shopper."'";
				$conn->query($sql);
			}

		}
		else{ 
			$sql="INSERT INTO `boughtItems`(`id`, `count`, `name`, `price`,shopper) VALUES ('".$product_id."',1,'".$product_name."',".$product_price.",'".$shopper."')";
			$conn->query($sql);
		}
	}
	else{ //if the customer is removing an item
		$sql="DELETE FROM `boughtitems` WHERE id='".$product_id."' && shopper='".$shopper."'";
        
        if($_POST["all"]=="true"){
            $sql="DELETE FROM `boughtitems` WHERE  shopper='".$shopper."'";
        }
		$conn->query($sql);
	}
}
$conn->close();
?>
