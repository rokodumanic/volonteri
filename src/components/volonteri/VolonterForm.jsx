import { useContext, useState } from "react";
import AppContext from "../../kontekst";
import { Button } from "react-bootstrap";

function VolonterForm(){
    const data = useContext(AppContext);
    let info = {...data.kontekst.volonteri};
    const [volonter, setVolonter] = useState({
        ime: "",
        kontakt: "",
        grad: "",
        aktivnosti: ""
    });

    function handlePrijava(){
        console.log("handlePrijava");
    }

    return (
        <form>
        <div>
          <label>
            Ime i prezime:
            <input
                type='text'
                name='ime'
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
                value={volonter.kontakt}
                className="addInput"
            />
          </label>
          <label>
            Grad:
            <input
                type='text'
                name='grad'
                value={volonter.grad}
                className="addInput"
            />
          </label>
          <label>
            Kategorije volontiranja:
            <input
                type='text'
                name='aktivnosti'
                value={volonter.aktivnosti}
                className="addInput"
            />
          </label>
          <Button onClick={handlePrijava}>Prijavi se</Button>
        </div>
      </form>
    );
}

export default VolonterForm;