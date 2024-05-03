import PredstavljanjeAutora from "../components/pocetna/PredstavljanjeAutora";
import OpisStranice from "../components/pocetna/OpisStranice";
import KontaktForma from "../components/pocetna/KontaktForma";

function Pocetna(){
    return(
        <div>
            <OpisStranice />
            <PredstavljanjeAutora/>
            <KontaktForma/>
        </div>
    );
}

export default Pocetna;