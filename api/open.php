<?php
     $response = array();

     try{
          $response["message"] = file_get_contents("../assets/test.txt");
          $response["success"] = true;

     }catch(Exception $ex){
          $response["success"] = false;
          $response["message"] = $ex;
     }

     echo json_encode($response);
?>
