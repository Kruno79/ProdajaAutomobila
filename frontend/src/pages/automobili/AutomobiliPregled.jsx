import { useEffect, useState } from "react"
import AutomobilService from "../../services/AutomobilService"
import { Button, Table } from "react-bootstrap";
import { NumericFormat } from "react-number-format";
import moment from "moment";
import { GrValidate } from "react-icons/gr";
import { Link, useNavigate } from "react-router-dom";
import { RouteNames } from "../../constants";


export default function AutomobiliPregled(){

    const[automobili, setAutomobili] = useState();
    const navigate = useNavigate();

    async function dohvatiAutomobile(){
        const odgovor = await AutomobilService.get()
        setAutomobili(odgovor)
    }

    // hooks (kuka) se izvodi prilikom dolaska na stranicu Smjerovi
    useEffect(()=>{
        dohvatiAutomobile();
    },[])


    function formatirajDatum(datum){
        if(datum==null){
            return 'Nije definirano'
        }
        return moment.utc(datum).format('DD. MM. YYYY.')
    }

    function vaucer(v){
        if(v==null) return 'gray'
        if(v) return 'green'
        return 'red'
    }

    function vaucerText(v){
        if(v==null) return 'Nije definirano'
        if(v) return 'Vaučer'
        return 'NIJE vaučer'
    }

    function obrisi(sifra){
        if(!confirm('Sigurno obrisati')){
            return;
        }
        brisanjeAutomobila(sifra);
    }

    async function brisanjeAutomobila(sifra) {
        const odgovor = await AutomobilService.obrisi(sifra);
        if(odgovor.greska){
            alert(odgovor.poruka);
            return;
        }
        dohvatiAutomobile();
    }


    return(
        <>
        <Link
        to={RouteNames.AUTOMOBIL_NOVI}
        className="btn btn-success siroko"
        >Dodaj novi automobil</Link>
        <Table striped bordered hover responsive>
            <thead>
                <tr>
                    <th>Marka</th>
                    <th>Model</th>
                    <th>Motor</th>
                    <th>Vin</th>
                    <th>Godište</th>
                    <th>Kilometraža</th>
                    <th>Akcija</th>
                </tr>
            </thead>
            <tbody>
                {automobili && automobili.map((automobil,index)=>(
                    <tr key={index}>
                        <td>
                            {automobil.marka}
                        </td>
                        <td>
                            {automobil.model}
                        </td> 
                        <td>
                            {automobil.motor}
                        </td> 
                        <td>
                            {automobil.vin}
                        </td> 
                        <td className="desno">
                            {automobil.godiste}
                        </td> 
                        <td>
                            {automobil.kilometraza}
                        </td>
                           


                        <td>
                            <Button
                            onClick={()=>navigate(`/automobili/${automobil.sifra}`)}
                            >Promjena</Button>
                            &nbsp;&nbsp;&nbsp;
                            <Button
                            variant="danger"
                            onClick={()=>obrisi(automobil.sifra)}
                            >Obriši</Button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
        </>
    )


}