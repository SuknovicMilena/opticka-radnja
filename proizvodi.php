
<html>

<head>
<link rel="stylesheet" href="site.css">

<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
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


</head>
<body>

<ul>
  <li><a href="proizvodi.php">Početna strana</a></li>
  <li><a href="pomocnapretraga.php">Pomocna pretraga</a></li>
  <li><a href="galerija.html">Galerija</a></li>
  <li><a href="kontakt.html">Kontakt</a></li>
  <li><a href="logout.php">Odjavi se</a></li>


</ul>


    <select id="proizvod-tip">
        <option selected disabled>--Izaberi Tip--</option>
        <option value="NaocareZaSunce">Naocare za sunce</option>
        <option value="NaocareZaVid">Naocare za vid</option>
        <option value="Proizvodjac">Proizvodjac</option>
    </select>
    
<h3> Proizvodi</h3>
<div class="proizvodi-holder">
    <table id="proizvodi">
        <thead>
            <th>Id</th>
            <th>Ime</th>
            <th>Proizvodjac</th>
            <th>Akcije</th>
        </thead>
        <tbody>
            
        </tbody>
    </table>
</div>

<div class="proizvodi-holderSunce">
    <table id="proizvodiSunce">
        <thead>
            <th>Id</th>
            <th>Ime</th>
            <th>Proizvodjac</th>
            <th>Akcije</th>
        </thead>
        <tbody>
            
        </tbody>
    </table>
</div>

<div class="proizvodjaci-holder">
    <table id="proizvodjaci">
        <thead>
            <th>Id</th>
            <th>Ime</th>
            <th>Akcije</th>
        </thead>
        <tbody>
            
        </tbody>
    </table>
</div>

<div>
    <button id="dodaj-naocare">Dodaj nove naocare</button>
    <button id="otkazi-naocare">Otkazi</button>
</div>

<div>
    <button id="dodaj-proizvodjaca">Dodaj novog proizvodjača</button>
    <button id="otkazi-proizvodjaca">Otkazi</button>
</div>


<div class="forma-holder-proizvodjaci">
    <label>Ime:</label>
    <input type="text" name="ime" id="imeProizvodjac" />
     <button id="sacuvajProizvodjaca">Sacuvaj</button>
</div>



<div class="forma-holder">
    <label>Ime:</label>
    <input type="text" name="ime" id="ime" />
    <label>Proizvodjac:</label>
    <select id="proizvodjac"></select>
    <button id="sacuvaj">Sacuvaj</button>
</div>


<div>
    <button id="dodaj-naocareSunce">Dodaj nove naocare</button>
    <button id="otkazi-naocareSunce">Otkazi</button>
</div>

<div class="forma-holderSunce">
    <label>Ime:</label>
    <input type="text" name="ime" id="imeSunce" />
    <label>Proizvodjac:</label>
    <select id="proizvodjacSunce"></select>
    <button id="sacuvajSunce">Sacuvaj</button>
</div>

<script src="https://code.jquery.com/jquery-2.2.4.min.js" integrity="sha256-BbhdlvQf/xTY9gja0Dq3HiwQF8LaCRTXxZKRutelT44="   crossorigin="anonymous"></script>
<script src="izaberiProizvod.js"></script>



<div class="slajder">
</div>

</body>

</html>