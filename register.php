<?php
    session_start();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital@1&display=swap"
      rel="stylesheet"/>
    <link rel="stylesheet" href="game.css">
    <title> Register </title>
</head>
<body>

<h1 id="login">Conway's Game of Life</h1>

<br>

<p>Register</p>

<form action="" method="POST">
    <label for="username">Username: </label>
    <input type="text" size="20" name="username" required> <br><br>
    <label for="password">Password: </label>
    <input type="password" size="20" name="password" required> <br><br><br>
    <input type="submit" class="buttons" name="signup" value="Register" >
</form>
 <br><br>

 <?php
if(isset($_POST['signup'])){
    // Check if $_POST['username'] is in users.txt already
    $content = file_get_contents('users.txt'); // Get content from users.txt
    $users = explode("\n", $content); // Split by new line - separates users
    $exists = False;
    foreach($users as $user){
        $user_values = explode(',', $user);
        if($_POST['username'] == $user_values[0]){
            $exists = True;
        }
    }
    if($exists){ // If username already exists - stay on page and try again
        echo 'Username already taken </br>';
    }
    else { // If username doesn't exist - create account
        $newUser = $_POST['username'].",".$_POST['password']."\n";
        $result = file_put_contents('users.txt', $newUser, FILE_APPEND); // Write to file
        if($result !== false){
            header("location:login.php");
        }
        else {
            echo 'Failed to write to file. Please check file permissions or file path.';
        }
    }
}
?>

<a href="login.php">Already have an account?</a>
</body>
</html>

