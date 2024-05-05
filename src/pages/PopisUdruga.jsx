import Popis from "../components/udruge/Popis";
import Zahtjevi from "../components/udruge/Zahtjevi";
import { useContext, useEffect } from "react";
import AppContext from "../kontekst";
import StvoriZahtjevBtn from "../components/udruge/StvoriZahtjevBtn";

function PopisUdruga(){
    const data = useContext(AppContext);

    return(
        <div>
            {data.kontekst.uloga==="korisnik" ? <StvoriZahtjevBtn /> : null}
            <Popis/>
            {data.kontekst.uloga==="administrator" ? <Zahtjevi /> : null}
        </div>
    );
}

export default PopisUdruga;