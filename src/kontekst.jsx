import {createContext} from 'react'

const AppContext = createContext({
    uloga: "korisnik",
    aktivnosti: [],
    volonteri: [], 
    udruge: []
});

export default AppContext;
