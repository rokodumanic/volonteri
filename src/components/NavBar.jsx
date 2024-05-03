import { useContext } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import CustomToggleButton from './ToggleBtn';
import AppContext from '../kontekst';


function NavBar() {

  const data = useContext(AppContext);

  function handleClick(action){
    data.setKontekst({...data.kontekst,  stranica: action});
  }

  return (
      <Navbar bg="light" data-bs-theme="light">
        <Container>
          <Navbar.Brand href="#home">Volontiraj</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link onClick={()=>handleClick("pocetna")}>Pocetna</Nav.Link>
            <Nav.Link onClick={()=>handleClick("aktivnosti")}>Aktivnosti</Nav.Link>
            <Nav.Link onClick={()=>handleClick("volonteri")}>Volonteri</Nav.Link>
            <Nav.Link onClick={()=>handleClick("udruge")}>Udruge</Nav.Link>
          </Nav>
          <CustomToggleButton />
        </Container>
      </Navbar>
  );
}

export default NavBar;