<?php 
	session_start();
	$db = "quiz";
	$user = "root";
	$pass = "";
	$host = "localhost"; 
	date_default_timezone_set( "Asia/Kolkata" );	
	$connection = mysqli_connect( $host, $user, $pass, $db );
	if( mysqli_connect_error() ){
		echo "Db error";
		if( $show_debug_errors ){
			echo mysqli_connect_error( $connection );
		}
        exit;
	}

?>
