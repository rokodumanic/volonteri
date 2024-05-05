import { useContext, useEffect } from "react";
import AppContext from "../../kontekst";
import axios from "axios";
import { Button } from "react-bootstrap";

function Popis() {
  const {kontekst, setKontekst} = useContext(AppContext);

  useEffect(() => {
    !kontekst.fresh && getUdruge();
  }, [kontekst.fresh]);

  async function getUdruge() {
    console.log("feth udrge")
    setKontekst({...kontekst, fresh:true})
    await axios
      .get("http://localhost:3001/udruge")
      .then((res) => {
        console.log("UsaJEEE")
        setKontekst({ ...kontekst, udruge: res.data });
      })
      .catch((err) => console.log("Error:", err));
  }

  async function handleBrisanje(obj) {
    await axios
      .delete(`http://localhost:3001/udruge/${obj.id}`)
      .then((res) => {
        console.log("Res brisanje:", res.data);
      })
      .then(async() => await getUdruge())
      .catch((err) => console.log("Error:", err));
  }

  return (
    <div >
      {kontekst.udruge.length > 0 ? (
        kontekst.udruge.map((eachUdruga) => (
          <div className="cardUdrugaContainer">
          <div className='cardUdruga' key={eachUdruga.id}>
            <h3>{eachUdruga.naziv}</h3>
            <p>Grad: {eachUdruga.grad}</p>
            <p>Adresa: {eachUdruga.adresa}</p>
            </div>
            {kontekst.uloga === "administrator" && <Button variant="danger" onClick={()=>handleBrisanje(eachUdruga)}>Izbrisi</Button>}
          </div>
        ))
      ) : (
        <h4>Trenutno nema nijedne udruge za volontere</h4>
      )}
    </div>
  );
}

export default Popis;