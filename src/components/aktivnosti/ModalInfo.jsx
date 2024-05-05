import { useContext } from "react";
import AppContext from "../../kontekst";

function ModalInfo(){
    const data = useContext(AppContext);
    const info = data.kontekst.aktivnosti.find(obj => obj.id === data.kontekst.selected)

    return(
        <div className="modalInfo">
        <p><b>Vrijeme odrzavanja:</b> {info.datum}</p>
        <p><b>Grad:</b> {info.lokacija}</p>
        {info.udruga != "" ? 
            <p><b>Organizator:</b> {info.udruga}</p> : 
            <p>Organizator <b>nije</b> volonterska udruga</p>
        }
        <p><b>Opis:</b></p>
        <p>{info.opis}</p>
        </div>
    )
}

export default ModalInfo