<?php
     $response = array();
     $response["history"] = array();

     $timestamp = $_POST["timestamp"];
     $user = $_POST["user"];

     //plz no mr. 4chan
     $conn = mysqli_connect("localhost", "ot", "ot", "ot");

     $query = "SELECT * FROM `history` WHERE CAST(`time` AS UNSIGNED) > '$timestamp' AND `user` != '$user'";
     $result = mysqli_query($conn, $query);

	if ($result && mysqli_num_rows($result) > 0) {
		$index = 0;
		while ($row = mysqli_fetch_assoc($result)) {
               $row["time"] = (int)$row["time"];
			$response["history"][$index] = $row;
			$index++;
		}
	}

     if (mysqli_connect_errno()) {
          printf("Connect failed: %s\n", mysqli_connect_error());
          $response["success"] = false;
     }else{
          $response["success"] = true;
     }


     echo json_encode($response);

?>
