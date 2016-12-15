<?php

if (!isset ($_GET["ime"])){

echo "Parametar ime nije prosleđen!";

} else {
$pomocna=$_GET["ime"];
include "konekcija.php";

$sql="SELECT ime FROM naocare_za_sunce WHERE ime LIKE '$pomocna%' ";
$rezultat = $mysqli->query($sql);

if ($rezultat->num_rows==0){
    
echo "U bazi ne postoji ime koja počinje na " . $pomocna;
} else {
while($red = $rezultat->fetch_object()){
?>

<?php  echo "$red->ime postoji u bazi, za dalje informacije pogledajte u tabeli";?>

 <br> </br>
 <br> </br>

<a href = "proizvodi.php">Pogledaj proizvod</a>
 <br> </br>
</h3>
</a>
<br/>

<?php
}
}
$mysqli->close();
}
?>
