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
    <title>Login</title>
</head>
<body>

<h1 id="login">Conway's Game of Life</h1>

<br>

<p>Login</p>

<form action="" method="POST">
    <label for="username">Username: </label>
    <input type="text" size="20" name="username" required> <br><br>
    <label for="password">Password: </label>
    <input type="password" size="20" name="password" required> <br><br><br>
    <input type="submit" class="buttons" name="login" value="Login" >
</form>
 <br><br>
 <?php
    if(isset($_POST['login'])){
        $content  = file_get_contents('users.txt'); //get content from users.txt
        $users = explode("\n", $content); //split by new line - seperates users

        foreach($users as $user){
            $user_values = explode(',', $user);
            if($_POST['username'] == $user_values[0] && $_POST['password'] == $user_values[1]){
                $_SESSION['user'] = $_POST['username'];
                header("location: game-of-life.html");
            }
            else{
                $incorrect = True;
            }
        }
        if($incorrect){
            echo 'Incorrect credentials </br>';
        }
    }
?>

<a href="register.php">Dont have an account?</a>

</body>
</html>