import { useContext } from "react";
import AppContext from "../../kontekst";
import { Button } from "react-bootstrap";
import axios from "axios";

function AktivnostVolonteri(){
    const data = useContext(AppContext);
    let info = {...data.kontekst.aktivnosti.find(obj => obj.id === data.kontekst.selected)}
    
    async function getZahtjeve() {
        console.log("fetch zahtjeve")
        data.setKontekst({...data.kontekst, fresh:true})
        await axios
          .get("http://localhost:3001/aktivnosti")
          .then((res) => {
              data.setKontekst({ ...data.kontekst, aktivnosti: res.data });
          })
          .catch((err) => console.log("Error:", err));
      }

    async function handleBrisanjeVolontera(obj, vol) {
        const newArr = info.volonteri.filter((id)=>id.id!==vol.id);
        console.log("YYYYYYY", newArr);
        await axios
          .patch(`http://localhost:3001/aktivnosti/${obj.id}`, {
            volonteri: [...newArr]
          })
          .then((res) => {
            console.log("Res brisanje:", res.data);
          })
          .then(async() => await getZahtjeve())
          .catch((err) => console.log("Error:", err));
      }

    return(
        <div>
            <ol>
                {info.volonteri != undefined && info.volonteri.map((vol, index) => (
                  <div key={vol.id} className="aktVol">
                    <li key={vol.ime}>{vol.ime} {vol.prezime}</li>
                    { data.kontekst.uloga==="administrator" && 
                        <Button variant="danger" onClick={()=>handleBrisanjeVolontera(info, vol)}>Izbrisi</Button>}
                  </div>
                ))}
            </ol>
        </div>
    );
}

export default AktivnostVolonteri;