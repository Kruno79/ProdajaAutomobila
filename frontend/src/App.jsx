import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { Container } from 'react-bootstrap'
import NavBarEdunova from './components/NavBarEdunova'
import { Route, Routes } from 'react-router-dom'
import { RouteNames } from './constants'
import Pocetna from './pages/Pocetna'
import AutomobiliPregled from './pages/automobili/AutomobiliPregled'
import AutomobiliDodaj from './pages/automobili/AutomobiliDodaj'
import AutomobiliPromjena from './pages/automobili/AutomobiliPromjena'



function App() {

  return (
    <>
      <Container>
        <NavBarEdunova />
        
        <Routes>
          <Route path={RouteNames.HOME} element={<Pocetna />} />
          <Route path={RouteNames.AUTOMOBIL_PREGLED} element={<AutomobiliPregled />} />
          <Route path={RouteNames.AUTOMOBIL_NOVI} element={<AutomobiliDodaj />} />
          <Route path={RouteNames.AUTOMOBIL_PROMJENA} element={<AutomobiliPromjena />} />
        </Routes>

        <hr />
        &copy; Kruno
      </Container>
     
    </>
  )
}

export default App
