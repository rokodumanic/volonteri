import { useState } from 'react';
import NavBar from './components/NavBar';
import AppContext from './kontekst';
import './App.css'

function App() {
  const [kontekst, setKontekst] = useState({
    uloga: "korisnik",
    aktivnosti: [],
    volonteri: [], 
    udruge: []
  });

  return (
    <div>
      <AppContext.Provider value={{kontekst, setKontekst}}>

        <NavBar />

      </AppContext.Provider>
    </div>
  )
}

export default App
