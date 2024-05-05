import { useContext, useState } from 'react';
import AppContext from '../../kontekst';
import { Button } from "react-bootstrap";
import { nanoid } from 'nanoid'
import axios from "axios";

function AddForm({onClose}){
    const data = useContext(AppContext);
    const gradovi = [
      "Karlovac",
      "Pula",
      "Rijeka",
      "Split",
      "Solin",
      "Trogir",
      "Vukovar",
      "Zagreb",
    ];
    const [aktivnost, setAkt] = useState({
        naziv: "",
        datum: "",
        lokacija: "",
        udruga: "",
        opis: ""
    });

    async function addAkt(idAkt){
          await  axios.post(`http://localhost:3001/aktivnosti/`, {...aktivnost, id: idAkt})
          .then(rez => console.log("REZ",rez))
          .catch(err => console.log(err.message));

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
      onClose()
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
          <label>Datum:</label>
      <input
        type="date"
        id={"date"}
        name="datum"
        value={aktivnost.datum}
        onChange={(e)=>handleInputChange(e)}
          />
          <label>
          Lokacija:
          <select
            type="text"
            name="lokacija"
            onChange={(e) => handleInputChange(e)}
            value={aktivnost.lokacija}
            className="addSelect"
          >
            <option value=""> Prazno </option>
            {gradovi.map((grad) => (
              <option key={grad} value={grad} required>
                {grad}
              </option>
            ))}
          </select>
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