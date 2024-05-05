import {createContext} from 'react'

const AppContext = createContext({
    uloga: "korisnik",
    aktivnosti: [],
    volonteri: [], 
    udruge: [],
    fresh: true
});

export default AppContext;
