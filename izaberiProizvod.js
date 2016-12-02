var naocareZaSunceUrl = 'naocareZaSunceOperacije.php';
var naocareZaVidUrl = 'naocareZaVidOperacije.php';
var proizvodjaciUrl = 'proizvodjaciOperacije.php';
var sveNaocareZaSunce = [];
var sveNaocareZaVid = [];
var sviProizvodjaci = [];

$(window).load(function () {

    //registruje event handler koji se okida kada promenis vrednost selecta
    // $('#proizvod-tip').change(function() {
    $(document).on('change', "#proizvod-tip", function () {

        //daje selected value inputa
        var selectedValue = $(this).val();
        $("div.dugmici").show();

        //Prikazi donji deo stranice

        switch (selectedValue) {

            // NAOCARE ZA VID/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
            case 'NaocareZaVid':
                $("div.proizvodjaci-holder").hide();
                $("div.proizvodi-holder").show();
                prikaziSveNaocareZaVid();
                $("#otkazi-naocare").show();
                break;

            // NAOCARE ZA SUNCE/////////////////////////////////////////////////////////////////////////////////////////////////////////////
            case 'NaocareZaSunce':
                $("div.proizvodjaci-holder").hide();
                $("div.proizvodi-holder").show();
                prikaziSveNaocareZaSunce();
                $("#otkazi-naocare").show();
                break;

            //proizvodjaci///////////////////////////////////////////////////////////////////////////////////////////////////////////////
            case 'Proizvodjac':
                $("div.proizvodi-holder").hide();
                $("div.proizvodjaci-holder").show();
                prikaziProizvodjace();
                $("#otkazi-naocare").show();
                break;

            default:

                break;
        }
    });
    //naredba insert //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    $(document).on('click', "#dodaj-naocare", function () {
        $("div.forma-holder").show();
        $(this).hide();
    });

    $(document).on('click', "#otkazi-naocare", function () {
        $("div.forma-holder").hide();
        $(this).hide();
        $("#dodaj-naocare").show();
    });

    $(document).on('click', "#sacuvaj", function () {

        var naocare = {
            ime: $("#ime").val(),
            proizvodjac_id: $("#proizvodjac").val()
        };
        $.post(naocareZaVidUrl, JSON.stringify(naocare), function (sacuvaneNaocare) {

            console.log(sacuvaneNaocare);
            $("div.forma-holder").hide();
            $(this).hide();
            $("#dodaj-naocare").show();
            prikaziSveNaocareZaVid();
        });
    });


    // naredbe koje su u celijama//////////////////////////////////////////////////////////////////////////////////////////

    $(document).on('click', ".izmeni", function () {

        // get the contents of the attribute 
        var naocareId = $(this).attr('data-id');

        var naocareZaUpdate = sveNaocareZaVid.filter(function (n) {
            return n.id == naocareId;
        })[0];

        var tdIme = $('#proizvodi td.ime[data-id="' + naocareId + '"]');
        var input = $('<input type="text" class="ime-edit" data-id="' + naocareId + '" />');
        input.val(tdIme.html());
        tdIme.html(input);

        var tdProizvodjac = $('#proizvodi td.proizvodjac[data-id="' + naocareId + '"]');
        var select = $('<select class="proizvodjac-edit" data-id="' + naocareId + '"/>');
        getProizvodjaci(select, function (finalSelectObject) {
            tdProizvodjac.html(finalSelectObject);
        });
        showEditButtons(naocareId);
    });

    $(document).on('click', ".izmeniSunce", function () {


        // get the contents of the attribute 
        var naocareId = $(this).attr('sunce-id');

        var naocareZaUpdate = sveNaocareZaSunce.filter(function (n) {
            return n.id == naocareId;
        })[0];

        var tdIme = $('#proizvodi td.imeSunce[sunce-id="' + naocareId + '"]');
        var input = $('<input type="text" class="ime-editSunce" sunce-id="' + naocareId + '" />');
        input.val(tdIme.html());
        tdIme.html(input);

        var tdProizvodjac = $('#proizvodi td.proizvodjacSunce[sunce-id="' + naocareId + '"]');
        var select = $('<select class="proizvodjac-editSunce" sunce-id="' + naocareId + '"/>');
        getProizvodjaci(select, function (finalSelectObject) {
            tdProizvodjac.html(finalSelectObject);
        });
        showEditButtonsSunce(naocareId);
    });

    $(document).on('click', ".izmeniProizvodjac", function () {

        // get the contents of the attribute 
        var proizvodjacID = $(this).attr('proizvodjac-id');

        var proizvodjacZaUpdate = sviProizvodjaci.filter(function (p) {
            return p.proizvodjac_id == proizvodjacID;
        })[0];

        var tdIme = $('#proizvodjaci td.imeProizvodjac[proizvodjac-id="' + proizvodjacID + '"]');
        var input = $('<input type="text" class="ime-editProizvodjac" proizvodjac-id="' + proizvodjacID + '" />');
        input.val(tdIme.html());
        tdIme.html(input);

        showEditButtonsProizvodjac(proizvodjacID);
    });



    $(document).on('click', ".save-edit", function () {
        var naocareId = $(this).attr('data-id');
        var naocare = {
            id: naocareId,
            ime: $('.ime-edit[data-id="' + naocareId + '"]').val(),
            proizvodjac_id: $('.proizvodjac-edit[data-id="' + naocareId + '"]').val()
        };
        updateNaocare(naocare);
    });


    $(document).on('click', ".save-editSunce", function () {
        var naocareId = $(this).attr('sunce-id');
        var naocare = {
            id: naocareId,
            ime: $('.ime-editSunce[sunce-id="' + naocareId + '"]').val(),
            proizvodjac_id: $('.proizvodjac-editSunce[sunce-id="' + naocareId + '"]').val()
        };
        updateNaocareSunce(naocare);
    });

    $(document).on('click', ".save-editProizvodjac", function () {
        var proizvodjacId = $(this).attr('proizvodjac-id');
        var proizvodjac = {
            id: proizvodjacId,
            ime: $('.ime-editProizvodjac[proizvodjac-id="' + proizvodjacId + '"]').val(),
        };
        updateProizvodjace(proizvodjac);
    });


    $(document).on('click', ".cancel-edit", function () {
        var naocareId = $(this).attr('data-id');
        var naocareZaUpdate = sveNaocareZaVid.filter(function (n) {
            return n.id == naocareId;
        })[0];

        $('#proizvodi td[data-id="' + naocareId + '"]').each(function () {
            if ($(this).hasClass('ime')) {
                $(this).html(naocareZaUpdate.ime);
            }
            else if ($(this).hasClass('proizvodjac')) {
                $(this).html(naocareZaUpdate.proizvodjac);
            }
        });

        hideEditButtons(naocareId);
    });

    $(document).on('click', ".cancel-editSunce", function () {
        var naocareId = $(this).attr('sunce-id');
        var naocareZaUpdate = sveNaocareZaSunce.filter(function (n) {
            return n.id == naocareId;
        })[0];

        $('#proizvodi td[sunce-id="' + naocareId + '"]').each(function () {
            if ($(this).hasClass('imeSunce')) {
                $(this).html(naocareZaUpdate.imeSunce);
            }
            else if ($(this).hasClass('proizvodjacSunce')) {
                $(this).html(naocareZaUpdate.proizvodjacSunce);
            }
        });

        hideEditButtonsSunce(naocareId);
    });


    $(document).on('click', ".obrisi", function () {
        if (confirm("Da li ste sigurni da zelite da obrisete ove naocare?")) {
            var naocareId = $(this).attr('data-id');
            $.ajax({
                url: naocareZaVidUrl + '?naocareId=' + naocareId,
                type: 'DELETE',
                success: function (result) {
                    prikaziSveNaocareZaVid();
                }
            });
        }
    });

    $(document).on('click', ".obrisiSunce", function () {
        if (confirm("Da li ste sigurni da zelite da obrisete ove naocare?")) {
            var naocareId = $(this).attr('sunce-id');
            $.ajax({
                url: naocareZaSunceUrl + '?naocareId=' + naocareId,
                type: 'DELETE',
                success: function (result) {
                    prikaziSveNaocareZaSunce();
                }
            });
        }
    });
    $(document).on('click', ".obrisiProizvodjac", function () {
        if (confirm("Da li ste sigurni da zelite da obrisete ove naocare?")) {
            var proizvodjacId = $(this).attr('proizvodjac-id');
            $.ajax({
                url: proizvodjaciUrl + '?proizvodjacId=' + proizvodjacId,
                type: 'DELETE',
                success: function (result) {
                    prikaziProizvodjace();
                }
            });
        }
    });

});



//funkcija vraca sve naocare za vid i sunce/////////////////////////////////////////////////////////////////////////////////////////////////////////////



function prikaziProizvodjace() {
    // dovuci podatke sa servera
    $.get(proizvodjaciUrl, function (proizvodjaciSaServera) {
        // napakuj html koji treba da se prikaze
        sviProizvodjaci = proizvodjaciSaServera;
        var sviProizvodjaciHtml = '';

        for (var i = 0; i < proizvodjaciSaServera.length; i++) {
            var proizvodjac = proizvodjaciSaServera[i];

            var proizvodjacHtml = '<tr>' +

                '<td>' + proizvodjac.proizvodjac_id + '</td>' +

                '<td class="imeProizvodjac" proizvodjac-id=' + proizvodjac.id + '>' + proizvodjac.ime + '</td>' +
                '<td>' +
                '<button class="izmeniProizvodjac" proizvodjac-id="' + proizvodjac.id + '">Izmeni</button>' +
                '<button class="obrisiProizvodjac" proizvodjac-id="' + proizvodjac.id + '">Obrisi</button>' +
                '<button class="save-editProizvodjac" proizvodjac-id="' + proizvodjac.id + '">Sacuvaj</button>' +
                '<button class="cancel-editProizvodjac" proizvodjac-id="' + proizvodjac.id + '">Otkazi</button>' +
                '</td>' +
                '</tr>';
            sviProizvodjaciHtml += proizvodjacHtml;
        }
        //postavi html u tbody tabele
        $('#proizvodjaci tbody').html(sviProizvodjaciHtml);
    });
}


function prikaziSveNaocareZaSunce() {
    // dovuci podatke sa servera
    $.get(naocareZaSunceUrl, function (naocareSunceServer) {
        // napakuj html koji treba da se prikaze
        sveNaocareZaSunce = naocareSunceServer;
        var sveNaocareSunceHtml = '';

        for (var i = 0; i < naocareSunceServer.length; i++) {
            var naocareSunce = naocareSunceServer[i];

            var naocareHtml = '<tr>' +
                '<td>' + naocareSunce.id + '</td>' +                     //td je jedna celija!!!!!
                '<td class="imeSunce" sunce-id=' + naocareSunce.id + '>' + naocareSunce.ime + '</td>' +
                '<td class="proizvodjacSunce" sunce-id=' + naocareSunce.id + '>' + naocareSunce.proizvodjac + '</td>' +
                '<td>' +
                '<button class="izmeniSunce" sunce-id="' + naocareSunce.id + '">Izmeni</button>' +
                '<button class="obrisiSunce" sunce-id="' + naocareSunce.id + '">Obrisi</button>' +
                '<button class="save-editSunce" sunce-id="' + naocareSunce.id + '">Sacuvaj</button>' +
                '<button class="cancel-editSunce" sunce-id="' + naocareSunce.id + '">Otkazi</button>' +
                '</td>' +
                '</tr>';
            sveNaocareSunceHtml += naocareHtml;
        }
        //postavi html u tbody tabele
        $('#proizvodi tbody').html(sveNaocareSunceHtml);
    });
}

function prikaziSveNaocareZaVid() {
    // dovuci podatke sa servera
    $.get(naocareZaVidUrl, function (naocareSaServera) {
        // napakuj html koji treba da se prikaze
        sveNaocareZaVid = naocareSaServera;
        var sveNaocareVidHtml = '';

        for (var i = 0; i < naocareSaServera.length; i++) {
            var naocare = naocareSaServera[i];

            var naocareHtml = '<tr>' +
                '<td>' + naocare.id + '</td>' +
                '<td class="ime" data-id=' + naocare.id + '>' + naocare.ime + '</td>' +
                '<td class="proizvodjac" data-id=' + naocare.id + '>' + naocare.proizvodjac + '</td>' +
                '<td>' +
                '<button class="izmeni" data-id="' + naocare.id + '">Izmeni</button>' +
                '<button class="obrisi" data-id="' + naocare.id + '">Obrisi</button>' +
                '<button class="save-edit" data-id="' + naocare.id + '">Sacuvaj</button>' +
                '<button class="cancel-edit" data-id="' + naocare.id + '">Otkazi</button>' +
                '</td>' +
                '</tr>';
            sveNaocareVidHtml += naocareHtml;
        }
        //postavi html u tbody tabele
        $('#proizvodi tbody').html(sveNaocareVidHtml);
    });
}


// VRACA SVE PROIZVODJACE//////////////////////////////////////////////////////////////////////////////////////////////////////

function getProizvodjaci(dropdown, callBack) {
    $.get(proizvodjaciUrl, function (proizvodjaci) {
        sviProizvodjaci = proizvodjaci;
        var proizvodjaciHtml = '';
        for (var i = 0; i < proizvodjaci.length; i++) {

            var proizvodjac = proizvodjaci[i];
            proizvodjaciHtml += '<option value="' + proizvodjac.proizvodjac_id + '">' + proizvodjac.ime + '</option>';
        }
        dropdown.html(proizvodjaciHtml);
        if (callBack) callBack(dropdown);
    });
}


//UPDATE NAOCARE////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function updateNaocare(naocareZaUpdate) {
    $.ajax({
        url: naocareZaVidUrl,
        type: 'PUT',
        data: JSON.stringify(naocareZaUpdate),
        success: function (result) {
            prikaziSveNaocareZaVid();
        }
    });
}

function updateNaocareSunce(naocareZaUpdate) {
    $.ajax({
        url: naocareZaSunceUrl,
        type: 'PUT',
        data: JSON.stringify(naocareZaUpdate),
        success: function (result) {
            prikaziSveNaocareZaSunce();
        }
    });
}

function updateProizvodjace(proizvodjacZaUpdate) {
    $.ajax({
        url: proizvodjaciUrl,
        type: 'PUT',
        data: JSON.stringify(proizvodjacZaUpdate),
        success: function (result) {
            prikaziProizvodjace();
        }
    });
}


//Prikazivanje i skrivanje dugmica//////////////////////////////////////////////////////////////////////////////////////////////
function showEditButtons(naocareId) {
    $('.save-edit[data-id="' + naocareId + '"]').show();
    $('.cancel-edit[data-id="' + naocareId + '"]').show();
    $('.izmeni[data-id="' + naocareId + '"]').hide();
    $('.obrisi[data-id="' + naocareId + '"]').hide();
}


function showEditButtonsSunce(naocareId) {
    $('.save-editSunce[sunce-id="' + naocareId + '"]').show();
    $('.cancel-editSunce[sunce-id="' + naocareId + '"]').show();
    $('.izmeniSunce[sunce-id="' + naocareId + '"]').hide();
    $('.obrisiSunce[sunce-id="' + naocareId + '"]').hide();
}
function showEditButtonsProizvodjac(imeId) {
    $('.save-editProizvodjac[proizvodjac-id="' + imeId + '"]').show();
    $('.cancel-editProizvodjac[proizvodjac-id="' + imeId + '"]').show();
    $('.izmeniProizvodjac[proizvodjac-id="' + imeId + '"]').hide();
    $('.obrisiProizvodjac[proizvodjac-id="' + imeId + '"]').hide();
}

function hideEditButtons(naocareId) {
    $('.save-edit[data-id="' + naocareId + '"]').hide();
    $('.cancel-edit[data-id="' + naocareId + '"]').hide();
    $('.izmeni[data-id="' + naocareId + '"]').show();
    $('.obrisi[data-id="' + naocareId + '"]').show();
}


function hideEditButtonsSunce(naocareId) {
    $('.save-editSunce[sunce-id="' + naocareId + '"]').hide();
    $('.cancel-editSunce[sunce-id="' + naocareId + '"]').hide();
    $('.izmeniSunce[sunce-id="' + naocareId + '"]').show();
    $('.obrisiSunce[sunce-id="' + naocareId + '"]').show();
}

function hideEditButtonsProizvodjac(imeId) {
    $('.save-editProizvodjac[proizvodjac-id="' + imeId + '"]').hide();
    $('.cancel-editProizvodjac[proizvodjac-id="' + imeId + '"]').hide();
    $('.izmeniProizvodjac[proizvodjac-id="' + imeId + '"]').show();
    $('.obrisiProizvodjac[proizvodjac-id="' + imeId + '"]').show();
}
