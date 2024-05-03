import { useEffect, useState } from 'react';
import NavBar from './components/NavBar';
import AppContext from './kontekst';
import './App.css'
import Pocetna from './pages/Pocetna';

function App() {
  const [kontekst, setKontekst] = useState({
    uloga: "korisnik",
    stranica: "pocetna",
    aktivnosti: [],
    volonteri: [], 
    udruge: []
  });

/*   useEffect(()=>{console.log("Kontekst", kontekst)},[kontekst]);
 */
  return (
    <div>
      <AppContext.Provider value={{kontekst, setKontekst}}>

        <NavBar />

        <Pocetna />

      </AppContext.Provider>
    </div>
  )
}

export default App
