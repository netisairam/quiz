<?php
require 'config.php';
if( isset($_SESSION) && !isset($_SESSION['user_first_name']) ){
    include('login.php');
}else{
    include('home.php');
}
?>