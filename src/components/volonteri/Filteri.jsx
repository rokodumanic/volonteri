import { useEffect, useState, useContext } from "react";
import { Button } from "react-bootstrap";
import AddVolonter from "./AddVolonter";
import AppContext from "../../kontekst";
import axios from "axios";

function Filteri() {
    const data = useContext(AppContext);
  const [isVisible, setVis] = useState(false);
  const aktivnosti = ["Ekologija", "Edukacija", "Prijevoz", "Razno"];
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
  const [filter, setFilter] = useState({
    grad: "",
    aktivnosti: "",
  });

  useEffect(()=>{
    FilterOut();
  },[filter])

  function showModal() {
    setVis(true);
  }

  function closeModal() {
    setVis(false);
  }

  async function FilterOut(){
    await axios.get('http://localhost:3001/volonteri/')
    .then((res)=>{
    let newArr = res.data.filter(
        obj => {
            if (filter.grad !== "" && filter.aktivnosti !== "") {
                return obj.grad === filter.grad && obj.aktivnosti.includes(filter.aktivnosti);
            } else if (filter.grad !== "") {
                return obj.grad === filter.grad;
            } else if (filter.aktivnosti !== "") {
                return obj.aktivnosti.includes(filter.aktivnosti);
            } else {
                return true;
            }
        }
    )
  console.log("FILTER OUT",newArr);
  data.setKontekst({ ...data.kontekst, volonteri: newArr , fresh:false  });})        
.catch((err) => console.log(err.message));
}

  function handleCheckbox(e) {
    const value = e.target.value;
      let newArr;
      if (filter.aktivnosti===value) {
        newArr = "";
      } else{
        newArr = value;
      }
      setFilter({ ...filter, aktivnosti: newArr });
  }

  function handleInputChange(e) {
    const { name, value } = e.target;
    setFilter({ ...filter, [name]: value });
  }

  return (
    <div>
      <h3>Filter:</h3>
      <form>
        <label>
          Grad:
          <select
            type="text"
            name="grad"
            onChange={(e) => handleInputChange(e)}
            value={filter.grad}
            className="addSelect"
          >
            <option value=""> Prazno </option>
            {gradovi.map((grad) => (
              <option key={grad} value={grad} required>
                {grad}
              </option>
            ))}
          </select>
        </label>
        <label>
          Kategorije volontiranja:
          {aktivnosti.map((akt) => (
            <label key={akt}>
              <input
                type="checkbox"
                name="aktivnosti"
                value={akt}
                checked={filter.aktivnosti.includes(akt)}
                onClick={(e) => handleCheckbox(e)}
              />{" "}
              {akt}
            </label>
          ))}
        </label>
      </form>
      {isVisible === true && <AddVolonter onClose={() => closeModal()} />}

      <Button onClick={showModal}>Novi Volonter</Button>
    </div>
  );
}

export default Filteri;
