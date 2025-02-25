import { Button, Col, Form, Row } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { RouteNames } from "../../constants";
import moment from "moment";
import AutomobilService from "../../services/AutomobilService";
import { useEffect, useState } from "react";


export default function AutomobiliPromjena(){

    const navigate = useNavigate();
    const [automobil,setAutomobil] = useState({});
    const [vaucer,setVaucer] = useState(false)
    const routeParams = useParams();

    async function dohvatiAutomobil(){
        const odgovor = await AutomobilService.getBySifra(routeParams.sifra)

        if(odgovor.izvodiSeOd!=null){
            odgovor.izvodiSeOd = moment.utc(odgovor.izvodiSeOd).format('yyyy-MM-DD')
        }
        
        setAutomobil(odgovor)
        //setVaucer(odgovor.vaucer)
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
                naziv: podaci.get('naziv'),
                cijenaAutomobil: parseFloat(podaci.get('cijenaAutomobila')),
                izvodiSeOd: moment.utc(podaci.get('izvodiSeOd')),
                //vaucer: podaci.get('vaucer')=='on' ? true : false
            }
        );
    }

    return(
    <>
    Promjena automobila
    <Form onSubmit={odradiSubmit}>

        <Form.Group controlId="naziv">
            <Form.Label>Naziv</Form.Label>
            <Form.Control type="text" name="naziv" required 
            defaultValue={automobil.naziv}/>
        </Form.Group>

        <Form.Group controlId="cijenaAutomobila">
            <Form.Label>Cijena</Form.Label>
            <Form.Control type="number" name="cijenaAutomobila" step={0.01} 
            defaultValue={automobil.cijenaAutomobila}/>
        </Form.Group>

        <Form.Group controlId="izvodiSeOd">
            <Form.Label>Izvodi se od</Form.Label>
            <Form.Control type="date" name="izvodiSeOd" 
            defaultValue={automobil.izvodiSeOd}/>
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