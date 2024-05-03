import Pocetna from './pages/Pocetna';
import { useContext } from 'react';
import AppContext from './kontekst';
import PopisAktivnosti from './pages/PopisAktivnosti';


function Router(){

    const data = useContext(AppContext);

    switch (data.kontekst.stranica) {
        case 'pocetna':
          return <Pocetna />;
        case 'aktivnosti':
          return <PopisAktivnosti />;
        /* case 'volonteri':
          return <Volonteri />;
        case 'udruge':
          return <Udruge />; */
        default:
          return <Pocetna/>;
      }
}

export default Router;