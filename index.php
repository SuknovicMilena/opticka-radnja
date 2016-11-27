<html>

<head>
<link rel="stylesheet" href="site.css">
</head>

<body>

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

<div id= "dugmici">
<button id="dodaj-naocare">Dodaj nove naocare</button>
<button id="otkazi-naocare">Otkazi</button>
</div>

<div class="forma-holder">
    <label>Ime:</label>
    <input type="text" name="ime" id="ime">
    <label>Proizvodjac:</label>
    <select id="proizvodjac"></select>
    <button id="sacuvaj">Sacuvaj</button>
</div>

<script src="https://code.jquery.com/jquery-2.2.4.min.js" integrity="sha256-BbhdlvQf/xTY9gja0Dq3HiwQF8LaCRTXxZKRutelT44="   crossorigin="anonymous"></script>
<script src="izaberiProizvod.js"></script>

</body>

</html>