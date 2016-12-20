var naocareZaSunceUrl = 'naocareZaSunceOperacije.php';
var naocareZaVidUrl = 'naocareZaVidOperacije.php';
var proizvodjaciUrl = 'proizvodjaciOperacije.php';
var sveNaocareZaSunce = [];
var sveNaocareZaVid = [];
var sviProizvodjaci = [];
var slikeUrl = ['slike.jpg', 'naocaree.jpg', 'fendi.jpg'];

$(window).load(function () {

    carousel();
    setInterval(carousel, 2000);



    $(document).on('change', "#proizvod-tip", function () {

        var selectedValue = $(this).val();
        switch (selectedValue) {

            // NAOCARE ZA VID/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
            case 'NaocareZaVid':
                $("div.proizvodjaci-holder").hide();
                $("div.proizvodi-holderSunce").hide();
                $("#dodaj-naocareSunce").hide();
                $("div.proizvodi-holderSunce").hide();
                $("div.proizvodi-holder").show();
                $("#dodaj-naocare").show();
                $("#otkazi-naocareSunce").hide();
                $("#dodaj-proizvodjaca").hide();

                prikaziSveNaocareZaVid();
                break;

            // NAOCARE ZA SUNCE/////////////////////////////////////////////////////////////////////////////////////////////////////////////
            case 'NaocareZaSunce':
                $("#dodaj-naocare").hide();
                $("div.proizvodjaci-holder").hide();
                $("div.proizvodi-holder").hide();
                $("#dodaj-naocareSunce").show();
                $("div.proizvodi-holderSunce").show();
                $("#dodaj-proizvodjaca").hide();
                $("#otkazi-naocare").hide();
                $("#otkazi-proizvodjace").hide();
                prikaziSveNaocareZaSunce();
                break;

            //proizvodjaci///////////////////////////////////////////////////////////////////////////////////////////////////////////////
            case 'Proizvodjac':
                $("#dodaj-naocare").hide();
                $("#dodaj-naocareSunce").hide();
                $("div.proizvodi-holderSunce").hide();
                $("div.proizvodi-holder").hide();
                $("div.proizvodjaci-holder").show();
                prikaziProizvodjace();
                $("#otkazi-naocare").hide();
                $("#otkazi-naocareSunce").hide();
                $("#dodaj-proizvodjaca").show();

                break;
            default:
                break;
        }
    });
    //naredba insert //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    $(document).on('click', "#dodaj-naocareSunce", function () {

        $("div.forma-holderSunce").show();
        $("#otkazi-naocareSunce").show();
        getProizvodjaci($('#proizvodjacSunce'));
        $(this).hide();
    });

    $(document).on('click', "#dodaj-naocare", function () {

        $("div.forma-holder").show();
        $("#otkazi-naocare").show();
        getProizvodjaci($('#proizvodjac'));
        $(this).hide();
    });


    $(document).on('click', "#dodaj-proizvodjaca", function () {

        $("div.forma-holder-proizvodjaci").show();
        $("#otkazi-proizvodjaca").show();
        $(this).hide();
    });

    $(document).on('click', "#otkazi-naocare", function () {
        $("div.forma-holder").hide();
        $(this).hide();
        $("#dodaj-naocare").show();
    });

    $(document).on('click', "#otkazi-naocareSunce", function () {
        $("div.forma-holderSunce").hide();
        $(this).hide();
        $("#dodaj-naocareSunce").show();
    });
    $(document).on('click', "#otkazi-proizvodjaca", function () {
        $("div.forma-holder-proizvodjaci").hide();
        $(this).hide();
        $("#dodaj-proizvodjaca").show();
    });


    $(document).on('click', "#sacuvaj", function () {

        var naocare;
        naocare = {
                    ime: $("#ime").val(),
                    proizvodjac_id: $("#proizvodjac").val()
                };


if (naocare.ime.length<3 || naocare.ime.length>8) {
    alert("Niste dobro uneli, unesite ponovo! ");
}
else{
       $.post(naocareZaVidUrl, JSON.stringify(naocare), function (sacuvaneNaocare) {

            console.log(sacuvaneNaocare);
            $("div.forma-holder").hide();
            $(this).hide();
            $("#dodaj-naocare").show();
            prikaziSveNaocareZaVid();
        });
}
 

    });

    $(document).on('click', "#sacuvajSunce", function () {

        var naocare = {
            ime: $("#imeSunce").val(),
            proizvodjac_id: $("#proizvodjacSunce").val()
        };
        $.post(naocareZaSunceUrl, JSON.stringify(naocare), function (sacuvaneNaocareSunce) {

            console.log(sacuvaneNaocareSunce);
            $("div.forma-holderSunce").hide();
            $(this).hide();
            $("#dodaj-naocareSunce").show();
            prikaziSveNaocareZaSunce();
        });
    });
    $(document).on('click', "#sacuvajProizvodjaca", function () {

        var proizvodjac = { ime: $("#imeProizvodjac").val() };
        $.post(proizvodjaciUrl, JSON.stringify(proizvodjac), function (sacuvaniProizvodjaci) {

            console.log(sacuvaniProizvodjaci);
            $("div.forma-holder-proizvodjaci").hide();
            $(this).hide();
            $("#dodaj-proizvodjaca").show();
            prikaziProizvodjace();
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
        var naocareId = $(this).attr('data-id');

        var naocareZaUpdate = sveNaocareZaSunce.filter(function (n) {
            return n.id == naocareId;
        })[0];

        var tdIme = $('#proizvodiSunce td.imeSunce[data-id="' + naocareId + '"]');
        var input = $('<input type="text" class="ime-edit-sunce" data-id="' + naocareId + '" />');
        input.val(tdIme.html());
        tdIme.html(input);

        var tdProizvodjac = $('#proizvodiSunce td.proizvodjacSunce[data-id="' + naocareId + '"]');
        var select = $('<select class="proizvodjac-edit-sunce" data-id="' + naocareId + '"/>');
        getProizvodjaci(select, function (finalSelectObject) {
            tdProizvodjac.html(finalSelectObject);
        });
        showEditButtonsSunce(naocareId);
    });

    $(document).on('click', ".izmeniProizvodjac", function () {

        // get the contents of the attribute 
        var proizvodjacID = $(this).attr('data-id');

        var proizvodjacZaUpdate = sviProizvodjaci.filter(function (p) {
            return p.proizvodjac_id == proizvodjacID;
        })[0];

        var tdIme = $('#proizvodjaci td.imeProizvodjac[data-id="' + proizvodjacID + '"]');
        var input = $('<input type="text" class="ime-edit-proizvodjac" data-id="' + proizvodjacID + '" />');
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

    $(document).on('click', ".save-edit-sunce", function () {
        var naocareId = $(this).attr('data-id');
        var naocare = {
            id: naocareId,
            ime: $('.ime-edit-sunce[data-id="' + naocareId + '"]').val(),
            proizvodjac_id: $('.proizvodjac-edit-sunce[data-id="' + naocareId + '"]').val()
        };
        updateNaocareSunce(naocare);
    });

    $(document).on('click', ".save-edit-proizvodjac", function () {
        var proizvodjacId = $(this).attr('data-id');
        var proizvodjac = {
            proizvodjac_id: proizvodjacId,
            ime: $('.ime-edit-proizvodjac[data-id="' + proizvodjacId + '"]').val()
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

    $(document).on('click', ".cancel-edit-sunce", function () {
        var naocareId = $(this).attr('data-id');
        var naocareZaUpdate = sveNaocareZaSunce.filter(function (n) {
            return n.id == naocareId;
        })[0];

        $('#proizvodi td[data-id="' + naocareId + '"]').each(function () {
            if ($(this).hasClass('imeSunce')) {
                $(this).html(naocareZaUpdate.ime);
            }
            else if ($(this).hasClass('proizvodjacSunce')) {
                $(this).html(naocareZaUpdate.proizvodjac);
            }
        });

        hideEditButtonsSunce(naocareId);
    });

    $(document).on('click', ".cancel-edit-proizvodjac", function () {
        var imeId = $(this).attr('data-id');
        var proizvodjacZaUpdate = sviProizvodjaci.filter(function (p) {
            return p.proizvodjac_id == imeId;
        })[0];

        $('#proizvodjaci td[data-id="' + imeId + '"]').each(function () {
            if ($(this).hasClass('imeProizvodjac')) {
                $(this).html(proizvodjacZaUpdate.ime);
            }
        });

        hideEditButtonsProizvodjac(imeId);
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
            var naocareId = $(this).attr('data-id');
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
            var proizvodjacID = $(this).attr('data-id');
            $.ajax({
                url: proizvodjaciUrl + '?proizvodjacID=' + proizvodjacID,
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

                '<td class="imeProizvodjac" data-id=' + proizvodjac.proizvodjac_id + '>' + proizvodjac.ime + '</td>' +
                '<td>' +
                '<button class="izmeniProizvodjac" data-id="' + proizvodjac.proizvodjac_id + '">Izmeni</button>' +
                '<button class="obrisiProizvodjac" data-id="' + proizvodjac.proizvodjac_id + '">Obrisi</button>' +
                '<button class="save-edit-proizvodjac" data-id="' + proizvodjac.proizvodjac_id + '">Sacuvaj</button>' +
                '<button class="cancel-edit-proizvodjac" data-id="' + proizvodjac.proizvodjac_id + '">Otkazi</button>' +
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
                '<td class="imeSunce" data-id=' + naocareSunce.id + '>' + naocareSunce.ime + '</td>' +
                '<td class="proizvodjacSunce" data-id=' + naocareSunce.id + '>' + naocareSunce.proizvodjac + '</td>' +
                '<td>' +
                '<button class="izmeniSunce" data-id="' + naocareSunce.id + '">Izmeni</button>' +
                '<button class="obrisiSunce" data-id="' + naocareSunce.id + '">Obrisi</button>' +
                '<button class="save-edit-sunce" data-id="' + naocareSunce.id + '">Sacuvaj</button>' +
                '<button class="cancel-edit-sunce" data-id="' + naocareSunce.id + '">Otkazi</button>' +
                '</td>' +
                '</tr>';
            sveNaocareSunceHtml += naocareHtml;
        }
        //postavi html u tbody tabele
        $('#proizvodiSunce tbody').html(sveNaocareSunceHtml);
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
    $('.save-edit-sunce[data-id="' + naocareId + '"]').show();
    $('.cancel-edit-sunce[data-id="' + naocareId + '"]').show();
    $('.izmeniSunce[data-id="' + naocareId + '"]').hide();
    $('.obrisiSunce[data-id="' + naocareId + '"]').hide();
}
function showEditButtonsProizvodjac(imeId) {
    $('.save-edit-proizvodjac[data-id="' + imeId + '"]').show();
    $('.cancel-edit-proizvodjac[data-id="' + imeId + '"]').show();
    $('.izmeniProizvodjac[data-id="' + imeId + '"]').hide();
    $('.obrisiProizvodjac[data-id="' + imeId + '"]').hide();
}

function hideEditButtons(naocareId) {
    $('.save-edit[data-id="' + naocareId + '"]').hide();
    $('.cancel-edit[data-id="' + naocareId + '"]').hide();
    $('.izmeni[data-id="' + naocareId + '"]').show();
    $('.obrisi[data-id="' + naocareId + '"]').show();
}

function hideEditButtonsSunce(naocareId) {
    $('.save-edit-sunce[data-id="' + naocareId + '"]').hide();
    $('.cancel-edit-sunce[data-id="' + naocareId + '"]').hide();
    $('.izmeniSunce[data-id="' + naocareId + '"]').show();
    $('.obrisiSunce[data-id="' + naocareId + '"]').show();
}

function hideEditButtonsProizvodjac(imeId) {
    $('.save-edit-proizvodjac[data-id="' + imeId + '"]').hide();
    $('.cancel-edit-proizvodjac[data-id="' + imeId + '"]').hide();
    $('.izmeniProizvodjac[data-id="' + imeId + '"]').show();
    $('.obrisiProizvodjac[data-id="' + imeId + '"]').show();
}

var currentIndex = 0;
function carousel() {
    var carouselHolder = $(".slajder")[0];
    var imageToUse = slikeUrl[currentIndex];
    carouselHolder.style.backgroundImage = 'url(' + imageToUse + ')';
    if (currentIndex < slikeUrl.length - 1) currentIndex++;
    else currentIndex = 0;
}
