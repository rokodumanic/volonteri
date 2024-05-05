import { useContext, useEffect } from "react";
import AppContext from "../../kontekst";
import axios from "axios";

function Popis(){
const data = useContext(AppContext);

useEffect(()=>{
    getUdruge();
}, [])

    async function getUdruge(){
        await axios.get("http://localhost:3001/udruge")
        .then((res)=>{data.setKontekst({...data.kontekst, udruge:[...res.data]})})
        .catch((err)=>console.log("Error:",err))
    }

    return(
        <div>
            {data.kontekst.udruge.length > 0 ?
                data.kontekst.udruge.map((eachUdruga)=>(
                    <div style={styles.card}>
                        <h3>{eachUdruga.naziv}</h3>
                        <p>Grad: {eachUdruga.grad}</p>
                        <p>Adresa: {eachUdruga.adresa}</p>
                    </div>
                )) : <h4>Trenutno nema nijedne udruge za volontere</h4>
            }
        </div>
    );
}

const styles = {
    card: {
      backgroundColor: '#ffffff',
      borderRadius: '8px',
      boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
      padding: '20px',
      margin: '10px',
      width: '100%',
      maxWidth: '400px',
    }
} 

export default Popis;