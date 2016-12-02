<?php
    include 'konekcija.php';

    switch ($_SERVER['REQUEST_METHOD']) {
        case 'GET':
            vratiSveProizvodjace();
            break;
        case 'POST':
            $proizvodjacZaCuvanje = json_decode(file_get_contents('php://input'));
            //getuj body requesta kao objekat
            dodajProizvodjaca($proizvodjacZaCuvanje);
            break;
        case 'PUT':
            $proizvodjacZaIzmenu = json_decode(file_get_contents('php://input'));
            izmeniProizvodjaca($proizvodjacZaIzmenu);
            break;
        case 'DELETE':
            parse_str($_SERVER['QUERY_STRING'], $params);
            obrisiProizvodjaca(intval($params['proizvodjacID']));
            break;
        default:
            throw new Exception('Error Processing Request', 1);
    }

    function vratiSveProizvodjace() {
        global $mysqli;
        $sql = 'SELECT * FROM proizvodjac';
        $rezultat = $mysqli->query($sql);
        
        $data = array();

        while ($row = $rezultat->fetch_assoc()){
            $data[] = $row;
        }

        header('Content-Type: application/json');
        echo json_encode($data);
    }

    function dodajProizvodjaca($proizvodjacZaCuvanje) {
        global $mysqli;
        $sql = 'INSERT INTO proizvodjac (ime,proizvodjac_id) 
        VALUES ("'. $proizvodjacZaCuvanje->ime . '","' . $proizvodjacZaCuvanje->proizvodjac_id . '")';

        if ($q = $mysqli->query($sql)) {
            $proizvodjacZaCuvanje->id = $mysqli->insert_id;        // my sqli ubacuje id jer smo stavili da je AI PRI KREIRANJU BAZE
            header('Content-Type: application/json');
            echo json_encode($naocareZaCuvanje); 
        } else {
            echo "GRESKA SA BAZOM";
            echo $mysqli->error;
        }
    }

    function izmeniProizvodjaca($proizvodjacZaIzmenu) {
        global $mysqli;
        
        $sql = "UPDATE proizvodjac 
                SET 
                      ime='$proizvodjacZaIzmenu->ime',
                    
                WHERE proizvodjac_id=$proizvodjacZaIzmenu->proizvodjac_id";


        if ($q = $mysqli->query($sql)) {
            header('Content-Type: application/json');
            echo json_encode($proizvodjacZaIzmenu); 
        } else {
            echo "GRESKA SA BAZOM";
            echo $mysqli->error;
        }
    }

    function obrisiProizvodjaca($proizvodjacID) {
        global $mysqli;

        $sql = "DELETE FROM proizvodjac WHERE proizvodjac_id=$proizvodjacID";

        if ($q = $mysqli->query($sql)) {
            echo true; 
        } else {
            echo "GRESKA SA BAZOM";
            echo $mysqli->error;
        }
    }
    
    $mysqli->close();
?>