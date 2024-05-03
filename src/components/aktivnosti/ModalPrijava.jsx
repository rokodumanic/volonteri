import { useContext } from "react";
import AppContext from "../../kontekst";

function ModalPrijava(){
    const data = useContext(AppContext);
    const info = data.kontekst.aktivnosti.find(obj => obj.id === data.kontekst.selected)

    function handleInputChange(e){
        const { name, value } = e.target;
        /* if(name==="ime"){
            data.setKontekst({ ...data.kontekst, [name]: value });
        } else */ if(name==="prezime"){
            data.setKontekst({ ...data.kontekst, [name]: value});
        }
     }

    return(
      <form onSubmit={()=>console.log("JAAAAAAAYYYYYY")}>
        <div>
          <label>
            Boja:
            <input
                type='text'
                name='ime'
                value={info.ime}
                onChange={(e)=>handleInputChange(e)}
                className="addInput"
                required
            />
          </label>
          <label>
            Marka:
            <input
                type='text'
                name='prezime'
                value={info.prezime}
                onChange={(e)=>handleInputChange(e)}
                className="addInput"
            />
          </label>
        </div>
      </form>
    );
}

export default ModalPrijava;