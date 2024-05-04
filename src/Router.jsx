import Pocetna from './pages/Pocetna';
import { useContext } from 'react';
import AppContext from './kontekst';
import PopisAktivnosti from './pages/PopisAktivnosti';
import PopisVolontera from './pages/PopisVolontera';
import PopisUdruga from './pages/PopisUdruga';


function Router(){

    const data = useContext(AppContext);

    switch (data.kontekst.stranica) {
        case 'pocetna':
          return <Pocetna />;
        case 'aktivnosti':
          return <PopisAktivnosti />;
        case 'volonteri':
          return <PopisVolontera />;
        case 'udruge':
          return <PopisUdruga />;
        default:
          return <Pocetna/>;
      }
}

export default Router;