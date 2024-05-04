import { useContext, useState } from 'react';
import AppContext from '../../kontekst';
import { Button } from "react-bootstrap";
import { nanoid } from 'nanoid'
import axios from "axios";

function AddForm(){
    const data = useContext(AppContext);
    const [aktivnost, setAkt] = useState({
        naziv: "",
        datum: "",
        lokacija: "",
        udruga: "",
        opis: ""
    });

    async function addAkt(idAkt){
          await  axios.post(`http://localhost:3001/aktivnosti/`, {...aktivnost, id: idAkt})
          .then(rez => console.log("REZ",rez)); 
      }

    function handleInputChange(e){
        const { name, value } = e.target;
            setAkt({...aktivnost, [name]: value });
        }

    function handleClick(){
        let arr = data.kontekst;
        const idAkt = nanoid()
        console.log("addAktivnost", aktivnost);
      arr.aktivnosti.push({...aktivnost, id: idAkt});
      data.setKontekst({...arr});
      addAkt(idAkt);
    }

    return(
      <form>
        <div>
          <label>
            Naziv:
            <input
                type='text'
                name='naziv'
                value={aktivnost.naziv}
                onChange={(e)=>handleInputChange(e)}
                className="addInput"
                required
            />
          </label>
          <label>
            Datum:
            <input
                type='text'
                name='datum'
                value={aktivnost.datum}
                onChange={(e)=>handleInputChange(e)}
                className="addInput"
                required
            />
          </label><label>
            Lokacija:
            <input
                type='text'
                name='lokacija'
                value={aktivnost.lokacija}
                onChange={(e)=>handleInputChange(e)}
                className="addInput"
                required
            />
          </label><label>
            Udruga:
            <input
                type='text'
                name='udruga'
                value={aktivnost.udruga}
                onChange={(e)=>handleInputChange(e)}
                className="addInput"
                required
            />
          </label><label>
            Opis:
            <input
                type='text'
                name='opis'
                value={aktivnost.opis}
                onChange={(e)=>handleInputChange(e)}
                className="addInput"
                required
            />
          </label>
        </div>
        <Button onClick={handleClick}>Stvori</Button>

      </form>
    );
}

export default AddForm;