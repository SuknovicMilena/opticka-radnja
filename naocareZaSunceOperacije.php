<?php
    include 'konekcija.php';

    switch ($_SERVER['REQUEST_METHOD']) {
        case 'GET':
            vratiSveNaocare();
            break;
        case 'POST':
            $naocareZaCuvanje = json_decode(file_get_contents('php://input'));
            //getuj body requesta kao objekat
            dodajNaocare($naocareZaCuvanje);
            break;
        case 'PUT':
            $naocareZaIzmenu = json_decode(file_get_contents('php://input'));
            izmeniNaocare($naocareZaIzmenu);
            break;
        case 'DELETE':
            parse_str($_SERVER['QUERY_STRING'], $params);
            obrisiNaocare(intval($params['naocareId']));
            break;
        default:
            throw new Exception('Error Processing Request', 1);
    }

    function vratiSveNaocare() {
        global $mysqli;
        $sql = 'SELECT n.id, n.ime as ime, p.ime as proizvodjac
                FROM naocare_za_sunce n 
                JOIN proizvodjac p ON (p.proizvodjac_id = n.proizvodjac_id)';
        $rezultat = $mysqli->query($sql);
        
        $data = array();

        while ($row = $rezultat->fetch_assoc()){
            $data[] = $row;
        }

        header('Content-Type: application/json');
        echo json_encode($data);
    }

    function dodajNaocare($naocareZaCuvanje) {
        global $mysqli;
        $sql = 'INSERT INTO naocare_za_sunce (ime, proizvodjac_id)  VALUES ("'. $naocareZaCuvanje->ime . '","' . $naocareZaCuvanje->proizvodjac_id . '")';
     
        if ($q = $mysqli->query($sql)) {
            $naocareZaCuvanje->id = $mysqli->insert_id; //sam nam insertuje id * AI kako smo i postavili kad smo pravili bazu
            header('Content-Type: application/json');
            echo json_encode($naocareZaCuvanje); 
        } else {
            echo "GRESKA SA BAZOM";
            echo $mysqli->error;
        }
    }

    function izmeniNaocare($naocareZaIzmenu) {
        global $mysqli;
        
        $sql = "UPDATE naocare_za_sunce
                SET 
                    ime='$naocareZaIzmenu->ime',
                    proizvodjac_id=$naocareZaIzmenu->proizvodjac_id
                WHERE id= $naocareZaIzmenu->id";

        if ($q = $mysqli->query($sql)) {
            header('Content-Type: application/json');
            echo json_encode($naocareZaIzmenu); 
        } else {
            echo "GRESKA SA BAZOM";
            echo $mysqli->error;
        }
    }

    function obrisiNaocare($naocareId) {
        global $mysqli;

        $sql = "DELETE FROM naocare_za_sunce WHERE id=$naocareId";

        if ($q = $mysqli->query($sql)) {
            echo true; 
        } else {
            echo "GRESKA SA BAZOM";
            echo $mysqli->error;
        }
    }
    
    $mysqli->close();
?>