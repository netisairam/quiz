<?php

$login_button = '';
if(isset($_GET["code"])){    
    $token = $google_client->fetchAccessTokenWithAuthCode($_GET["code"]);
    if(!isset($token['error'])){
        $google_client->setAccessToken($token['access_token']);
        $_SESSION['access_token'] = $token['access_token'];
        $google_service = new Google_Service_Oauth2($google_client);        
        $data = $google_service->userinfo->get();        
        if( isset($data['givenName']) && $data['givenName'] != ''){
            echo "testing";
            $_SESSION['user_first_name'] = $data['givenName'];
        }        
        header('Location: /quiz');
        exit;
    }
}

if(!isset($_SESSION['access_token'])){
    $login_button = '<a class="btn btn-primary m-auto" href="'.$google_client->createAuthUrl().'">Login With Google</a>';
}
?>
<html>
 <head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
  <title>PHP Login using Google Account</title>
  <meta charset="utf-8">
    <?php
        include('include_header.php');
    ?>
  </head>
 <body>
  
   
   <?php
    
        echo '<div class="container h-100 d-flex align-items-center">'.$login_button . '</div>';
    
   ?>


 </body>
</html>