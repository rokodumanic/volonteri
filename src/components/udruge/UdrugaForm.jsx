import { useContext, useState } from "react";
import AppContext from "../../kontekst";
import { Button } from "react-bootstrap";
import axios from "axios";

function UdrugaForm({ onClose }) {
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
  const [udruga, setUdruga] = useState({
    naziv: "",
    adresa: "",
    grad: ""
  });

  const isButtonDisabled =
  udruga.naziv == "" || udruga.adresa == "" || udruga.grad == "";

  function handleInputChange(e) {
    const { name, value } = e.target;
    setUdruga({ ...udruga, [name]: value });
  }

  async function handlePrijava() {
    if (!isButtonDisabled) {
      await axios
        .post(`http://localhost:3001/zahtjevi/`, { ...udruga })
        .then(() => {
          console.log(udruga);
          onClose();
        })
        .catch((err) => console.log(err.message));
    }
    console.log("handlePrijava");
  }

  return (
    <form>
      <div>
        <label>
          Naziv:
          <input
            type="text"
            name="naziv"
            onChange={(e) => handleInputChange(e)}
            value={udruga.naziv}
            className="addInput"
            required
          />
        </label>
        <label>
          Adresa:
          <input
            type="text"
            name="adresa"
            onChange={(e) => handleInputChange(e)}
            value={udruga.adresa}
            className="addInput"
          />
        </label>
        <label>
          Grad:
          <select
            type="text"
            name="grad"
            onChange={(e) => handleInputChange(e)}
            value={udruga.grad}
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
        <Button
          disabled={isButtonDisabled}
          style={
            isButtonDisabled
              ? { backgroundColor: "grey", cursor: "not-allowed" }
              : {}
          }
          onClick={handlePrijava}
        >
          Prijavi
        </Button>
      </div>
    </form>
  );
}

export default UdrugaForm;
