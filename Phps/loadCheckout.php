<?php

require_once("connect_db.php");

if($_SERVER["REQUEST_METHOD"]=='POST'){
    $shopper=$_POST["shopper"];
	

    $sql="SELECT `id`, `count`, `name`, `price` FROM `boughtitems` WHERE shopper='".$shopper."'";

    $result=$conn->query($sql);
    $res=array();

    if($result->num_rows>0){
        while($rows=$result->fetch_array()){
            array_push($res,array(
                'pd_id'=>$rows["id"],
                'pd_count'=>$rows["count"],
                'pd_price'=>$rows["price"],
                'pd_title'=>$rows["name"]
            ));
        }
        echo(json_encode(array("CHECK"=>$res)));
    }
}
$conn->close();
?>
