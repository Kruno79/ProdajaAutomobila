import { Button, Col, Form, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { RouteNames } from "../../constants";
import moment from "moment";
import AutomobilService from "../../services/AutomobilService";


export default function AutomobiliDodaj(){

    const navigate = useNavigate();

    async function dodaj(automobil){
        const odgovor = await AutomobilService.dodaj(automobil);
        if(odgovor.greska){
            alert(odgovor.poruka)
            return
        }
        navigate(RouteNames.AUTOMOBIL_PREGLED)
    }

    function odradiSubmit(e){ // e je event
        e.preventDefault(); // nemoj odraditi zahtjev na server pa standardnom načinu

        let podaci = new FormData(e.target);

        dodaj(
            {
                marka: podaci.get('marka'),
                model: podaci.get('model'),
               
                motor: podaci.get('motor'),
                vin: podaci.get('vin'),
                godiste: podaci.get('godiste'),
                kilometraza: podaci.get('kilometraza'),
            
                
               
             
            }
        );
    }

    return(
    <>
    Dodavanje automobila
    <Form onSubmit={odradiSubmit}>

        <Form.Group controlId="marka">
            <Form.Label>Marka</Form.Label>
            <Form.Control type="text" name="marka" required />
        </Form.Group>

        <Form.Group controlId="model">
            <Form.Label>Model</Form.Label>
            <Form.Control type="text" name="model" required />
        </Form.Group>

        <Form.Group controlId="motor">
            <Form.Label>Motor</Form.Label>
            <Form.Control type="text" name="motor" required />
        </Form.Group>

        <Form.Group controlId="vin">
            <Form.Label>Vin</Form.Label>
            <Form.Control type="text" name="vin" required />
        </Form.Group>

        <Form.Group controlId="godiste">
            <Form.Label>Godiste</Form.Label>
            <Form.Control type="text" name="godiste" required />
        </Form.Group>

        <Form.Group controlId="kilometraza">
            <Form.Label>Kilometraza</Form.Label>
            <Form.Control type="text" name="kilometraza" required />
        </Form.Group>

    

        <hr/>

        <Row>
            <Col xs={6} sm={6} md={3} lg={2} xl={6} xxl={6}>
                <Link
                to={RouteNames.AUTOMOBIL_PREGLED}
                className="btn btn-danger siroko"
                >Odustani</Link>
            </Col>
            <Col xs={6} sm={6} md={9} lg={10} xl={6} xxl={6}>
                <Button variant="success" type="submit" className="siroko">
                    Dodaj AUTOMOBIL
                </Button>
            </Col>
        </Row>


    </Form>




   
    </>
    )
}