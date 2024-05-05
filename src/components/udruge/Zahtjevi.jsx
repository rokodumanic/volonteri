import { useContext, useEffect, useState } from "react";
import AppContext from "../../kontekst";
import axios from "axios";
import { Button } from "react-bootstrap";
import { nanoid } from "nanoid";

function Zahtjevi() {
  const { kontekst, setKontekst } = useContext(AppContext);

  useEffect(() => {
    !kontekst.fresh && getZahtjeve();
  }, [kontekst.fresh]);

  async function getZahtjeve() {
    console.log("fetch zahtjeve")
    setKontekst({...kontekst, fresh:true})
    await axios
      .get("http://localhost:3001/zahtjevi")
      .then((res) => {
          setKontekst({ ...kontekst, zahtjevi: res.data });
      })
      .catch((err) => console.log("Error:", err));
  }

  async function handlePotvrdu(obj) {
    await axios
      .post("http://localhost:3001/udruge", { ...obj, id: nanoid() })
      .then(async() => await axios.get("http://localhost:3001/udruge"))
      .then((res) => setKontekst({ ...kontekst, udruge: res.data }))
      .catch((err) => console.log("Error:", err));
    await handleBrisanje(obj);
  }

  async function handleBrisanje(obj) {
    await axios
      .delete(`http://localhost:3001/zahtjevi/${obj.id}`)
      .then((res) => {
        console.log("Res brisanje:", res.data);
      })
      .then(async() => await getZahtjeve())
      .catch((err) => console.log("Error:", err));
  }

  return (
    <div>
      <h3>Zahtjevi za odobravanje</h3>
      {kontekst.zahtjevi.length > 0 ? (
        kontekst.zahtjevi.map((eachZahtjev) => (
          <div key={eachZahtjev.id} style={styles.card}>
            <div>
              <h3>{eachZahtjev.naziv}</h3>
              <p>Grad: {eachZahtjev.grad}</p>
              <p>Adresa: {eachZahtjev.adresa}</p>
            </div>
            <Button onClick={() => handlePotvrdu(eachZahtjev)}>Potvrdi</Button>
            <Button onClick={() => handleBrisanje(eachZahtjev)}>Izbrisi</Button>
          </div>
        ))
      ) : (
        <h4>Trenutno nema nijednog zahtijeva za pokretanje udruge</h4>
      )}
    </div>
  );
}

const styles = {
  card: {
    backgroundColor: "#ffffff",
    borderRadius: "8px",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
    padding: "20px",
    margin: "10px",
    width: "100%",
    maxWidth: "400px",
  },
};

export default Zahtjevi;
