import { useContext } from "react";
import AppContext from "../../kontekst";

function AktivnostVolonteri(){
    const data = useContext(AppContext);
    let info = {...data.kontekst.aktivnosti.find(obj => obj.id === data.kontekst.selected)}
    

    return(
        <div>
            <ol>
                {info.volonteri != undefined && info.volonteri.map((vol, index) => (
                  <li key={index}>{vol.ime} {vol.prezime}</li>
                ))}
            </ol>
        </div>
    );
}

export default AktivnostVolonteri;