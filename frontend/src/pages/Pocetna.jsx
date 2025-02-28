import slika from '../assets/slika.jpg'

export default function Pocetna(){
    return(
        <>
        Dobodošli na moju aplikaciju.
        <img src={slika} alt="ProdajaAutomobila"  className='slika' />
        </>
    )
}