<?php
   include("konekcija.php");
   session_start();
   
    if($_SERVER["REQUEST_METHOD"] == "POST") {
  
      
        $ime=$_POST['username'];
        $lozinka=$_POST['password'];
        
        $sql="SELECT * FROM korisnici WHERE ime='$ime' AND lozinka='$lozinka' ";
        $rezultat = $mysqli->query($sql);
        if ($rezultat->num_rows==1){
            $_SESSION['login_user']=$korisnickoime;
            header("location: proizvodi.php");
    } else {
            $poruka1 = "Korisnicko ime ili lozinka su pogresni!";
            echo "<script type='text/javascript'>alert('$poruka1');</script>";
        }
        $mysqli->close();
 }
   
?>

<html>
      <head>
      <link rel="stylesheet" href="loginIndex.css">
  <title>Uloguj se</title>
      
  </head>
   
   <body>
      <div id="login" align="center">
         
         <div style = "width:500px; border: solid 1px #FF0000; " align = "center">
         <div style = "background-color:#f442ce; color:#FFFFFF; padding:3px;">
            
            <b>Uloguj se</b>
				
            <div style = "margin:30px">
               
               <form action = "" method = "post">
                  <label>Korisničko ime:</label><input type = "text" name = "username" class = "box"/><br /><br />
                  <label>Lozinka:</label><input type = "password" name = "password" class = "box" /><br/><br />
                  <input type = "submit" value = " Potvrdi " /><br />
               </form>
                </div>
				
         </div>
			
      </div>

   </body>
</html>