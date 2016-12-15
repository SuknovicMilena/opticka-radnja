<html>
<head>

<link rel="stylesheet" href="site.css">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<script src="sugerisi.js" type="text/javascript"></script> 
<script type="text/javascript">

function place(ele){
    document.getElementById('txt').value = ele.innerHTML;
	document.getElementById("livesearch").style.display = "none";
}
</script>
<style type="text/css"> 

#livesearch{ 
  margin:5px;
  width:220px;
  }
#txt{
  border: solid #A5ACB2;
  margin:5px;
  } 
</style>

<style>
ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
    overflow: hidden;

}

li {
    float: left;
}

li a {
    display: block;
    color: black;
    text-align: center;
    padding: 16px;
    text-decoration: none;
}

li a:hover {
    background-color: white;
}
</style>

<body>

<ul>
  <li><a href="proizvodi.php">Početna strana</a></li>
  <li><a href="pomocnapretraga.php">Pomocna pretraga</a></li>
  <li><a href="glasanje.php">Glasaj za najbolji proizvod</a></li>
  <li><a href="galerija.html">Galerija</a></li>
  <li><a href="kontakt.html">Kontakt</a></li>
  <li><a href="logout.php">Odjavi se</a></li>
</ul>
</head>

<body onload="document.getElementById('txt').focus()">
<form>
<input type="text" id="txt" size="32" onkeyup="sugestija(this.value)"> 
<div id="livesearch"></div>

</form>
</body>

</html>
