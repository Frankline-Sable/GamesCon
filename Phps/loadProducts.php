<?php

require_once("connect_db.php");

$sql="SELECT `id`, `category`, `price`, `title`, `picture` FROM `products` WHERE 1";

$result=$conn->query($sql);
$res=array();

if($result->num_rows>0){
	while($rows=$result->fetch_array()){
		array_push($res,array(
			'pd_id'=>$rows["id"],
			'pd_categ'=>str_replace("/","-",$rows["category"]),
			'pd_price'=>$rows["price"],
			'pd_title'=>$rows["title"],
			'pd_pic'=>str_replace("../","",$rows["picture"])
		));
	}
	echo(json_encode(array("PRODUCTS"=>$res)));
}
$conn->close();
?>