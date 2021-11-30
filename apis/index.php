<?php
include("config.php");
if($_POST['action'] == "login"){    
    $password = "test";
    $password = base64_encode($password);
    $status = "success";
    if( $_POST['email'] == "test@gmail.com" && $_POST['password'] == $password ){
        $message = "Login Success";
    }else{
        $status = "fail";
        $message = "Login Failed please check username and password";
    }
    echo json_encode(["status" => $status, "message" => $message]);
    exit;
}
if( $_POST["action"] == "addtopics" ){
    $status = "fail";
    if( $_POST['type'] == "update" ){
        $query = "select id from topics where id = '".mysqli_escape_string($connection, $_POST["topic_id"])."'";
        $res = mysqli_query($connection, $query);
        if(mysqli_error($connection)){
            $status = "fail";
            // $message=" Error in db ".mysqli_error($connection); 
            $message= "Please try after sometime"; 
            echo json_encode(["status" => $status, "message" => $message]);
            exit;
        }else{
            $row = mysqli_fetch_assoc($res);
            if( is_array($row) && sizeof($row) > 0 ){
                if(is_numeric($_POST['topic_id']) && $_POST['topic_id'] > 0){
                    $query = "update topics set
                    topic = '" . mysqli_escape_string($connection, $_POST["topic_name"]). "' 
                    where id = " . $_POST['topic_id']. " limit 1";
                    $ress = mysqli_query( $connection , $query );
                    if( mysqli_error( $connection )){
                        $status = "fail";
                        $message= "Please try after sometime"; 
                        echo json_encode(["status" => $status, "message" => $message]);
                        exit;
                    }else{
                        echo json_encode(["status" => "success"]);
                        exit;
                    }
                }else{
                    $status = "fail";
                    $message= "Please try after sometime"; 
                    echo json_encode(["status" => $status, "message" => $message]);
                    exit;
                }
            }
        
        }
    }else if($_POST["topic_name"] != ""){
        $query = "select id from topics where topic = '".mysqli_escape_string($connection, $_POST["topic_name"])."'";
        $res = mysqli_query($connection, $query);
        if(mysqli_error($connection)){
            $status = "fail";
            // $message=" Error in db ".mysqli_error($connection); 
            $message= "Please try after sometime"; 
            echo json_encode(["status" => $status, "message" => $message]);
            exit;
        }else{
            $row = mysqli_fetch_assoc($res);
            if( is_array($row) && sizeof($row) > 0 ){
                if( $_POST['type'] == "insert" ){
                    $status = "fail2";
                    $message= "Topic Name already exist's"; 
                    echo json_encode(["status" => $status, "message" => $message]);
                    exit;
                }                
            }else{
                $query = "insert into topics set
                topic = '".mysqli_escape_string( $connection , $_POST['topic_name'] )."'";
                $ress = mysqli_query( $connection , $query );
                if( mysqli_error( $connection )){
                    $status = "fail";
                    // $message=" Error in db ".mysqli_error($connection); 
                    $message= "Please try after sometime"; 
                    echo json_encode(["status" => $status, "message" => $message]);
                    exit;
                }else{
                    echo json_encode(["status" => "success"]);
                    exit;
                }
            }
        }
    }else{
        echo json_encode(["status" => "fail", "message" => "Please enter topic"]);
    }
}
if( $_POST["action"] == "gettopics" ){
    $query = "select * from topics";
    $res = mysqli_query($connection, $query);
    if(mysqli_error($connection)){
        $status = "fail";
        $message=" Error in db ".mysqli_error($connection); 
        echo json_encode(["status" => $status, "message" => $message]);
        exit;
    }else{
        $all_topics = array();
        while($row = mysqli_fetch_assoc($res)){
            $all_topics[] = $row;
        }
        if( is_array($all_topics) && sizeof($all_topics) > 0 ){
            echo json_encode(["status" => "success", "data"=>$all_topics]);
            exit;
        }
    }      
}
if( $_POST["action"] == "save_question" ){
    
    $query = "insert into questions set
    topic = '".mysqli_escape_string( $connection , $_POST['q_topic'] )."', 
    question = '".mysqli_escape_string( $connection , $_POST['question'] )."', 
    option_a = '".mysqli_escape_string( $connection , strtolower($_POST['option_a']) )."', 
    option_b = '".mysqli_escape_string( $connection , strtolower($_POST['option_b']) )."', 
    option_c = '".mysqli_escape_string( $connection , strtolower($_POST['option_c']) )."', 
    option_d = '".mysqli_escape_string( $connection , strtolower($_POST['option_d']) )."', 
    answer = '".mysqli_escape_string( $connection , strtolower($_POST['answer']) )."' ";
    $ress = mysqli_query( $connection , $query );
    if( mysqli_error( $connection )){
        $status = "fail";
        // $message=" Error in db ".mysqli_error($connection); 
        $message= "Please try after sometime"; 
        echo json_encode(["status" => $status, "message" => $message]);
        exit;
    }else{
        echo json_encode(["status" => "success"]);
        exit;
    }
    
}
if( $_POST["action"] == "getquestions" ){
    $where = "";
    $perpage = 5;
    if( isset($_POST['search']) && $_POST['search'] != ""){
        $where = " where topic = '".mysqli_escape_string( $connection , $_POST['search'])."' ";
    }
    $query = "select count(*) as cnt from questions ".$where;
    $res = mysqli_query($connection, $query);
    if(mysqli_error($connection)){
        $status = "fail";
        $message=" Error in db ".mysqli_error($connection); 
        echo json_encode(["status" => $status, "message" => $message]);
        exit;
    }else{
        $row = mysqli_fetch_assoc($res);
        // print_r($row);exit;
        $total = $row['cnt'];
        $pages = ceil( $total/$perpage );
        $current_page = (isset($_POST['page']) && $_POST['page']>1)?$_POST['page']:1;
        $start = ($current_page-1)*$perpage;        
        $query = "select * from questions ".$where."  order by id desc limit " . $start . "," . $perpage;
        $res = mysqli_query($connection, $query);
        if(mysqli_error($connection)){
            $status = "fail";
            $message=" Error in db ".mysqli_error($connection); 
            echo json_encode(["status" => $status, "message" => $message]);
            exit;
        }else{
            $all_questions = array();
            while($row = mysqli_fetch_assoc($res)){
                $all_questions[] = $row;
            }
            if( is_array($all_questions) && sizeof($all_questions) > 0 ){
                echo json_encode([
                        "status" => "success",
                        "data"=>$all_questions,
                        "total"=> $total,
                        "perpage"=>$perpage,
                        "current_page"=> $current_page,
                        "pages"=> $pages,                        
                        "prev"=>($current_page<$pages?$current_page-1:1),
					    "next"=>($current_page+1<$pages?$current_page+1:$pages),
                    ]);
                exit;
            }else{
                echo json_encode(["status" => "fail", "message" => "No Questions"]);
                exit;
            }
        }      
    }
}
if( $_POST["action"] == "deletequestion" ){
    if( is_numeric($_POST["qid"]) ){
        $query = "select * from questions where id = '".mysqli_escape_string( $connection , $_POST["qid"])."' limit 1";
        $res = mysqli_query($connection, $query);
        if(mysqli_error($connection)){
            $status = "fail";
            $message = "Please try after sometime"; 
            echo json_encode(["status" => $status, "message" => $message]);
            exit;
        }else{
            $query = "delete from questions where id = '".mysqli_escape_string( $connection , $_POST["qid"])."'";
            $res = mysqli_query($connection, $query);
            if(mysqli_error($connection)){
                $status = "fail";
                $message = "Please try after sometime"; 
                echo json_encode(["status" => $status, "message" => $message]);
                exit;
            }else{
                echo json_encode(['status' => 'success']);
                exit;
            }
        }
    }
}
if( $_POST["action"] == "update_question" ){
    if( is_numeric($_POST["qid"]) ){
        $query = "select * from questions where id = '".mysqli_escape_string( $connection , $_POST["qid"])."' limit 1";
        $res = mysqli_query($connection, $query);
        if(mysqli_error($connection)){
            $status = "fail";
            $message = "Please try after sometime"; 
            echo json_encode(["status" => $status, "message" => $message]);
            exit;
        }else{
            $row = mysqli_fetch_assoc($res);
            if( isset($row) && sizeof($row) > 0 ){
                $query = "update questions set
                topic = '".mysqli_escape_string( $connection , $_POST['q_topic'] )."', 
                question = '".mysqli_escape_string( $connection , $_POST['question'] )."', 
                option_a = '".mysqli_escape_string( $connection , strtolower($_POST['option_a']) )."', 
                option_b = '".mysqli_escape_string( $connection , strtolower($_POST['option_b']) )."', 
                option_c = '".mysqli_escape_string( $connection , strtolower($_POST['option_c']) )."', 
                option_d = '".mysqli_escape_string( $connection , strtolower($_POST['option_d']) )."', 
                answer = '".mysqli_escape_string( $connection , strtolower($_POST['answer']) )."'                
                where id = " . $_POST['qid']. " limit 1";
                $ress = mysqli_query( $connection , $query );
                if( mysqli_error( $connection )){
                    $status = "fail";
                    $message= "Please try after sometime"; 
                    echo json_encode(["status" => $status, "message" => $message]);
                    exit;
                }else{
                    echo json_encode(["status" => "success"]);
                    exit;
                }          
            }
        }
    }
}
if( $_POST["action"] == "geteditrecord" ){
    if( is_numeric($_POST["qid"]) ){
        $query = "select * from questions where id = '".mysqli_escape_string( $connection , $_POST["qid"])."' limit 1";
        $res = mysqli_query($connection, $query);
        if(mysqli_error($connection)){
            $status = "fail";
            $message = "Please try after sometime"; 
            echo json_encode(["status" => $status, "message" => $message]);
            exit;
        }else{
            $row = mysqli_fetch_assoc($res);
            // print_r($row);exit;          
            echo json_encode(["status" => "success", "data" => $row]);
            exit;
        }
    }else{
        $status = "fail";
        $message = "Please try after sometime"; 
    }
}

// frontend 
function checklogin($val){
    if( isset($_SESSION) && isset($_SESSION['user_first_name']) ){
        $t = json_encode(["status"=>"success", "data"=>$_SESSION['user_first_name']]);                
        $tt = "success";
    }else{
        $t = json_encode(["status"=>"fail3"]);        
        $tt = "fail";
    }
    if($val == "username" ){
        return $t;
    }else{
        return $tt;
    }
}
if( $_POST["action"] == "getusername" ){
    echo checklogin('username');
    exit;
}
if( $_POST['action'] ){
    $loginstatus = checklogin('');
    if($loginstatus == "fail"){
        echo json_encode(["status" => "fail", "message" => "Please login"]);
        exit;
    }    
}
if( $_POST["action"] == "getquizquestion" ){
    if( is_numeric($_POST["topic"]) ){
        $query = "select * from questions where topic = '".$_POST['topic']."' ORDER BY RAND() limit 10";    
        $res = mysqli_query($connection, $query);
        if(mysqli_error($connection)){
            $status = "fail";
            $message = "Please try after sometime"; 
            echo json_encode(["status" => $status, "message" => $message]);
            exit;
        }else{
            $data = array();
            while($row = mysqli_fetch_assoc($res)){
                $data[] = $row;
            }
            if( sizeof($data) > 0 ){
                echo json_encode(["status"=>"success", "data"=>$data]);
                exit;
            }else{
                echo json_encode(["status"=>"fail", "message"=>"Question doesn't exists"]);
                exit;
            }                
        }
    }else{
        echo json_encode(["status"=>"fail", "message"=>"Please try after sometime"]);
        exit;
    }
}
if( $_POST["action"] == "getfornttopics" ){
    $query = "SELECT * FROM `topics` where id in (SELECT topic FROM `questions` group by topic HAVING count(id) >= 10 )";    
    $res = mysqli_query($connection, $query);
    if(mysqli_error($connection)){
        $status = "fail";
        $message = "Please try after sometime"; 
        echo json_encode(["status" => $status, "message" => $message]);
        exit;
    }else{
        $data = array();
        while($row = mysqli_fetch_assoc($res)){
            $data[$row['id']] = $row['topic'];
        }
        // print_r($row);exit;          
        echo json_encode(["status" => "success", "data" => $data]);
        exit;
    }
}
?>