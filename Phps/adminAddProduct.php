<?php

require_once("connect_db.php");

if(isset($_POST["submit"])){
	
	$category=$_POST["_categories"];
	$price=$_POST["_priceField"];
	$name=$_POST["_titleField"];
	
	$imgDirForDb="";
	
	
	if(uploadImage()===TRUE){
		
		$query="INSERT INTO `products`(`id`, `category`, `price`, `title`, `picture`) VALUES (NULL,'".$category."',".$price.",'".$name."','".$imgDirForDb."')";
		
		if($conn->query($query)===FALSE){
			die("Error adding data ".$conn->error);
		}else{
            header("Location:../index.html",true,301);
		}
	}else{
		echo "Sorry, there was an error uploading your file.";
	}	
}
else{
	echo("<h3 style='color:red'>This is an illegal Operation</h3>");
}
$conn->close();

function uploadImage(){
	global $imgDirForDb;
	
	$imgToUpload=$_FILES["gamePicUpload"]["tmp_name"];
	
	$path_parts=pathinfo($_FILES["gamePicUpload"]["name"]);
	$file_extension=strtolower($path_parts["extension"]);
	
	$target_dir = "../images/products/";
	$target_file=$target_dir."prod_".time().".".$file_extension;
	
	$imgDirForDb=$target_file;
	
	// Check if image file is a actual image or fake image
	$check = getimagesize($imgToUpload);
	if($check ===FALSE) {
		die("File is not an image.");
	}
	// Allow certain file formats
	if($file_extension != "jpg" && $file_extension != "png" && $file_extension != "jpeg"
	&& $file_extension != "gif" ) {
		echo "Sorry, only JPG, JPEG, PNG & GIF files are allowed.";
	}
	// Check file size
	if ($_FILES["gamePicUpload"]["size"] > 1000000) {
		die("Sorry, your file is too large.");
	}
	if(move_uploaded_file($imgToUpload, $target_file)) {
		return(TRUE);
	} else {
		return(FALSE);
	}
}

?>