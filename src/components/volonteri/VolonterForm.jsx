import { useContext, useState } from "react";
import AppContext from "../../kontekst";
import { Button } from "react-bootstrap";
import axios from "axios";

function VolonterForm(){
    const data = useContext(AppContext);
    let info = {...data.kontekst.volonteri};
    const gradovi = ["Karlovac", "Pula", "Rijeka", "Split", "Solin", "Trogir", "Vukovar", "Zagreb"];
    const aktivnosti = ["Ekologija", "Edukacija", "Prijevoz", "Razno"];
    const [volonter, setVolonter] = useState({
        ime: "",
        kontakt: "",
        grad: "",
        aktivnosti: []
    });

    function handleInputChange(e){
        const { name, value } = e.target;
        setVolonter({ ...volonter, [name]: value });
     }

    async function handlePrijava(){
        if(volonter.ime!="" && volonter.kontakt!=""){
            await axios.post(`http://localhost:3001/volonteri/`, {...volonter})
            .then(rez => console.log("REZ",rez))
            .catch(err => console.log(err.message)); 
        }
        console.log("handlePrijava");
    }


    const handleOptionChange = (e) => {
        const value = e.target.value;
        let updatedSelectedOptions = [...volonter.aktivnosti];
    
        if (e.target.checked) {
          updatedSelectedOptions.push(value);
        } else {
          updatedSelectedOptions = updatedSelectedOptions.filter((option) => option !== value);
        }
        console.log("updatedSelectedOptions", updatedSelectedOptions)

        setVolonter({...volonter, aktivnosti: updatedSelectedOptions})
    }

    function handleRadioChange(e){
        const { name, value } = e.target;
        console.log("volonter.aktivnosti", volonter.aktivnosti)

        if(volonter.aktivnosti!=[]){
            if(volonter.aktivnosti.find(obj => obj === value) != -1){
                let arr = volonter.aktivnosti;
                arr.filter((option) => option !== value);
                setVolonter({...arr});
            } else {
                let arr = volonter.aktivnosti;
                arr.push(value);
                setVolonter({...arr});
            }
        } else{
            let obj = {...volonter};
            obj.aktivnosti = [value]
            setVolonter({...volonter, aktivnosti: obj.aktivnosti})
        }
        console.log("updatedSelectedOptions", volonter.aktivnosti)

    }

    function isChecked(akt){
        
        if(volonter.aktivnosti.indexOf(akt) != -1){
            return true;
        } else{ return false;}
        
    }

    return (
        <form>
        <div>
          <label>
            Ime i prezime:
            <input
                type='text'
                name='ime'
                onChange={(e)=>handleInputChange(e)}
                value={volonter.ime}
                className="addInput"
                required
            />
          </label>
          <label>
            Kontakt:
            <input
                type='text'
                name='kontakt'
                onChange={(e)=>handleInputChange(e)}
                value={volonter.kontakt}
                className="addInput"
            />
          </label>
          <label>
            Grad:
            <select
                type='text'
                name='grad'
                onChange={(e)=>handleInputChange(e)}
                value={volonter.grad}
                className="addSelect"
            >
                <option value=''> Prazno </option>
                {gradovi.map(grad => (
              <option key={grad} value={grad} required>
                {grad}
              </option>
            ))}
            </select>
          </label>
          <label>
            Kategorije volontiranja:
            {aktivnosti.map((akt)=> (
                <label key={akt}>
                    <input
                        type='radio'
                        name='aktivnosti'
                        value={akt}
                        checked={()=>isChecked(akt)}
                        onChange={(e)=>handleRadioChange(e)}
                    />{" "}
                    {akt}
                </label>
            ))} 
          </label>
          <Button onClick={handlePrijava}>Prijavi se</Button>
        </div>
      </form>
    );
}

export default VolonterForm;