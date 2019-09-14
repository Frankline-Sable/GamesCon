
<?php
//incase the redirect fails
//if the user requests a logout
//first clear the session, check whether it exists first
session_start();

session_unset();
	// destroy the session
session_destroy();

?>