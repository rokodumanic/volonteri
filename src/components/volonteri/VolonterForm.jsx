import { useContext, useState } from "react";
import AppContext from "../../kontekst";
import { Button } from "react-bootstrap";
import axios from "axios";

function VolonterForm({ onClose }) {
  const data = useContext(AppContext);
  let info = { ...data.kontekst.volonteri };
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
  const aktivnosti = ["Ekologija", "Edukacija", "Prijevoz", "Razno"];
  const [volonter, setVolonter] = useState({
    ime: "",
    kontakt: "",
    grad: "",
    aktivnosti: [],
  });

  const isButtonDisabled =
    volonter.ime == "" || volonter.kontakt == "" || volonter.grad == "";

  function handleInputChange(e) {
    const { name, value } = e.target;
    setVolonter({ ...volonter, [name]: value });
  }

  async function handlePrijava() {
    if (!isButtonDisabled) {
      await axios
        .post(`http://localhost:3001/volonteri/`, { ...volonter })
        .then(async() => await axios.get("http://localhost:3001/volonteri"))
        .then((res) => {
          console.log("AAAAAAAAAAAAAAA",volonter);
          data.setKontekst({ ...data.kontekst, volonteri: res.data, fresh:false });
        })
        .then(()=>onClose())
        .catch((err) => console.log(err.message));
    }
    console.log("handlePrijava");
  }

  function handleCheckbox(e) {
    const value = e.target.value;
    if (volonter.aktivnosti.length) {
      let newArr;
      if (volonter.aktivnosti.includes(value)) {
        newArr = volonter.aktivnosti.filter((item) => item != value);
      } else {
        newArr = volonter.aktivnosti.concat([value]);
      }
      setVolonter({ ...volonter, aktivnosti: newArr });
    } else setVolonter({ ...volonter, aktivnosti: [value] });
  }

  return (
    <form>
      <div>
        <label>
          Ime i prezime:
          <input
            type="text"
            name="ime"
            onChange={(e) => handleInputChange(e)}
            value={volonter.ime}
            className="addInput"
            required
          />
        </label>
        <label>
          Kontakt:
          <input
            type="text"
            name="kontakt"
            onChange={(e) => handleInputChange(e)}
            value={volonter.kontakt}
            className="addInput"
          />
        </label>
        <label>
          Grad:
          <select
            type="text"
            name="grad"
            onChange={(e) => handleInputChange(e)}
            value={volonter.grad}
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
                checked={volonter.aktivnosti.includes(akt)}
                onClick={(e) => handleCheckbox(e)}
              />{" "}
              {akt}
            </label>
          ))}
        </label>
        <Button
          disabled={isButtonDisabled}
          style={
            isButtonDisabled
              ? { backgroundColor: "grey", cursor: "not-allowed" }
              : {}
          }
          onClick={handlePrijava}
        >
          Prijavi se
        </Button>
      </div>
    </form>
  );
}

export default VolonterForm;
