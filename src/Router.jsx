import Pocetna from './pages/Pocetna';


function Router(){
    switch (value) {
        case 'pocetna':
          return <Pocetna />;
        /* case 'aktivnosti':
          return <Aktivnosti />;
        case 'volonteri':
          return <Volonteri />;
        case 'udruge':
          return <Udruge />; */
        default:
          return <Pocetna/>;
      }
}

export default Router;