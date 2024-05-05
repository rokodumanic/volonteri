import { useContext, useEffect } from "react";
import AppContext from "../../kontekst";
import axios from "axios";

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
        setKontekst({ ...kontekst, udruge: res.data });
      })
      .catch((err) => console.log("Error:", err));
  }

  return (
    <div>
      {kontekst.udruge.length > 0 ? (
        kontekst.udruge.map((eachUdruga) => (
          <div key={eachUdruga.id} style={styles.card}>
            <h3>{eachUdruga.naziv}</h3>
            <p>Grad: {eachUdruga.grad}</p>
            <p>Adresa: {eachUdruga.adresa}</p>
          </div>
        ))
      ) : (
        <h4>Trenutno nema nijedne udruge za volontere</h4>
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

export default Popis;
