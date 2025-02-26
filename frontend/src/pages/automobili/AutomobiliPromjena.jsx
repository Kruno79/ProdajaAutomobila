import { Button, Col, Form, Row } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { RouteNames } from "../../constants";
import moment from "moment";
import AutomobilService from "../../services/AutomobilService";
import { useEffect, useState } from "react";


export default function AutomobiliPromjena(){

    const navigate = useNavigate();
    const [automobil,setAutomobil] = useState({});
    const routeParams = useParams();

    async function dohvatiAutomobil(){
        const odgovor = await AutomobilService.getBySifra(routeParams.sifra)

  
        setAutomobil(odgovor)
    }

    useEffect(()=>{
        dohvatiAutomobil();
    },[])

    async function promjena(automobil){
        const odgovor = await AutomobilService.promjena(routeParams.sifra,automobil);
        if(odgovor.greska){
            alert(odgovor.poruka)
            return
        }
        navigate(RouteNames.AUTOMOBIL_PREGLED)
    }

    function odradiSubmit(e){ // e je event
        e.preventDefault(); // nemoj odraditi zahtjev na server pa standardnom načinu

        let podaci = new FormData(e.target);

        promjena(
            {
                marka: podaci.get('marka'),
                model: podaci.get('model'),
               
                motor: podaci.get('motor'),
                vin: podaci.get('vin'),
                godiste: podaci.get('godiste'),
                kilometraza: podaci.get('kilometraza')
            }
        );
    }

    return(
    <>
    Promjena automobila
    <Form onSubmit={odradiSubmit}>

        <Form.Group controlId="marka">
            <Form.Label>Marka</Form.Label>
            <Form.Control type="text" name="marka" required 
            defaultValue={automobil.marka}/>
        </Form.Group>

        <Form.Group controlId="model">
            <Form.Label>Model</Form.Label>
            <Form.Control type="text" name="model" step={0.01} 
            defaultValue={automobil.model}/>
        </Form.Group>

        <Form.Group controlId="motor">
            <Form.Label>Motor</Form.Label>
            <Form.Control type="text" name="motor" 
            defaultValue={automobil.motor}/>
        </Form.Group>

        <Form.Group controlId="vin">
            <Form.Label>VIN</Form.Label>
            <Form.Control type="text" name="vin" 
            defaultValue={automobil.vin}/>
        </Form.Group>

        <Form.Group controlId="godiste">
            <Form.Label>Godište</Form.Label>
            <Form.Control type="number" name="godiste" 
            defaultValue={automobil.godiste}/>
        </Form.Group>

        <Form.Group controlId="kilometraza">
            <Form.Label>Kilometraža</Form.Label>
            <Form.Control type="number" name="kilometraza" 
            defaultValue={automobil.kilometraza}/>
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
                    Promjeni automobil
                </Button>
            </Col>
        </Row>


    </Form>




   
    </>
    )
}