var naocareZaSunceUrl = 'naocareZaSunceOperacije.php';
var naocareZaVidUrl = 'naocareZaVidOperacije.php';
var proizvodjaciUrl = 'proizvodjaciOperacije.php';
var sveNaocareZaSunce = [];
var sveNaocareZaVid = [];

$(window).load(function () {

    $("div.proizvodi-holder").hide();
    $("div.forma-holder").hide();
    $("div.dugmici").hide();

    //registruje event handler kada promenis vrednost selecta
    $(document).on('change', "#proizvod-tip", function () {

        //daje selected value inputa
        var selectedValue = $(this).val();

        //Prikazi donji deo stranice

        switch (selectedValue) {
            // NAOCARE ZA SUNCE//////////////////////////////////
            case 'NaocareZaSunce':

                $("div.proizvodi-holder").show();
                prikaziSveNaocareZaSunce();
                $("#otkazi-naocare").show();

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
                    $.post(naocareZaSunceUrl, JSON.stringify(naocare), function (sacuvaneNaocare) {
                        console.log(sacuvaneNaocare);
                        $("div.forma-holder").hide();
                        $(this).hide();
                        $("#dodaj-naocare").show();
                        prikaziSveNaocareZaSunce();
                    })
                });
                break;
            // NAOCARE ZA VID//////////////////////////////////////////////////////////////////////////////////////////////////////////////////7
            case 'NaocareZaVid':

                $("div.proizvodi-holder").show();
                prikaziSveNaocareZaVid();
                $("#otkazi-naocare").show();

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
                    })



                });

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

                    // $('#proizvodi td[data-id="' + naocareId + '"]').each(function () {
                    //     if ($(this).hasClass('ime')) {
                    //         var html = $(this).html();
                    //         var input = $('<input type="text" class="ime-edit" data-id="' + naocareId + '" />');
                    //         input.val(html);
                    //         $(this).html(input);
                    //     }
                    //     else if ($(this).hasClass('proizvodjac')) {
                    //         var html = $(this).html();
                    //         var select = $('<select class="proizvodjac-edit" data-id="' + naocareId + '"/>');
                    //         var td = $(this);
                    //         getProizvodjaci(select, function (finalSelectObject) {
                    //             td.html(finalSelectObject);
                    //         });
                    //     }
                    // });
                    showEditButtons(naocareId);
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

                break;

            default:

                break;
        }
    })


})


//funkcija vraca sve naocare
function prikaziSveNaocareZaSunce() {

    // dovuci podatke sa servera
    $.get(naocareZaSunceUrl, function (sveNaocareZaSunce) {
        // napakuj html koji treba da se prikaze
        var sveNaocareSunceHtml = '';
        for (var i = 0; i < sveNaocareZaSunce.length; i++) {
            var naocare = sveNaocareZaSunce[i];

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
            sveNaocareSunceHtml += naocareHtml;
        }
        //postavi html u tbody tabele
        $('#proizvodi tbody').html(sveNaocareSunceHtml);
    });
}


//funkcija vraca sve naocare 

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

function getProizvodjaci(dropdown, callBack) {
    $.get(proizvodjaciUrl, function (proizvodjaci) {
        var proizvodjaciHtml = '';
        for (var i = 0; i < proizvodjaci.length; i++) {
            var proizvodjac = proizvodjaci[i];
            proizvodjaciHtml +=
                '<option value="' + proizvodjac.proizvodjac_id + '">' + proizvodjac.ime + '</option>';
        }
        dropdown.html(proizvodjaciHtml);
        if (callBack) callBack(dropdown);
    });
}


function showEditButtons(naocareId) {
    $('.save-edit[data-id="' + naocareId + '"]').show();
    $('.cancel-edit[data-id="' + naocareId + '"]').show();
    $('.izmeni[data-id="' + naocareId + '"]').hide();
    $('.obrisi[data-id="' + naocareId + '"]').hide();
}

function hideEditButtons(naocareId) {
    $('.save-edit[data-id="' + naocareId + '"]').hide();
    $('.cancel-edit[data-id="' + naocareId + '"]').hide();
    $('.izmeni[data-id="' + naocareId + '"]').show();
    $('.obrisi[data-id="' + naocareId + '"]').show();
}


