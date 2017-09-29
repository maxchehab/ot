<?php
     $requests = $_POST["requests"];
     $user = $_POST["user"];
     $conn = mysqli_connect("localhost", "ot", "ot", "ot");

     foreach($requests as $request){
          $position = $request["position"];
          $value = $request["value"];
          $timestamp = milliseconds();
          mysqli_query($conn, "INSERT INTO `history` (`time`, `type`, `position`, `value`, `user`) VALUES ('$timestamp', 'insert', '$position', '$value', '$user') ");
     }


     function milliseconds() {
         $mt = explode(' ', microtime());
         return ((int)$mt[1]) * 1000 + ((int)round($mt[0] * 1000));
     }
?>
