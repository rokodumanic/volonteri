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
      <form className="prijavaAkt">
        <div>
          <label className="prijavaAktLabel">
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
          <label className="prijavaAktLabel">Datum:
      <input
        type="date"
        id={"date"}
        name="datum"
        value={aktivnost.datum}
        onChange={(e)=>handleInputChange(e)}
          />
          </label>
          <label className="prijavaAktLabel">
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
        </label><label className="prijavaAktLabel">
            Udruga:
            <input
                type='text'
                name='udruga'
                value={aktivnost.udruga}
                onChange={(e)=>handleInputChange(e)}
                className="addInput"
                required
            />
          </label><label className="prijavaAktLabel">
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
        <div className="prijavaAktButtonContainer">
        <Button variant='dark' onClick={handleClick}>Stvori</Button>
        </div>

      </form>
    );
}

export default AddForm;