import { useContext, useEffect } from "react";
import AppContext from "../../kontekst";
import axios from "axios";
import { Button } from "react-bootstrap";
import { nanoid } from "nanoid";


function Zahtjevi(){
    const data = useContext(AppContext);

    useEffect(()=>{
        getZahtjeve();
    }, [])
    
        async function getZahtjeve(){
            await axios.get("http://localhost:3001/zahtjevi")
            .then((res)=>{data.setKontekst({...data.kontekst, zahtjevi:[...res.data]})})
            .then((res)=>console.log("Res:", res, data.kontekst))
            .catch((err)=>console.log("Error:",err))
        }

        async function handlePotvrdu(obj){
            await axios.post("http://localhost:3001/udruge", { ...obj, id: nanoid()})
            .then(()=>axios.get("http://localhost:3001/udruge"))
            .then((res)=>data.setKontekst({...data.kontekst, udruge:[...res.data]}))
            .then(()=>handleBrisanje(obj))
            .catch((err)=>console.log("Error:",err))
            }

        async function handleBrisanje(obj){
            await axios.delete(`http://localhost:3001/zahtjevi/${obj.id}`)
            .then((res)=>console.log("Res brisanje:",res.data))
            .catch((err)=>console.log("Error:",err))
        }
    
        return(
            <div>
            <h3>Zahtjevi za odobravanje</h3>
                {data.kontekst.zahtjevi.length > 0 ?
                    data.kontekst.zahtjevi.map((eachZahtjev)=>(
                        <div style={styles.card}>
                        <div>
                            <h3>{eachZahtjev.naziv}</h3>
                            <p>Grad: {eachZahtjev.grad}</p>
                            <p>Adresa: {eachZahtjev.adresa}</p>
                        </div>
                            <Button onClick={()=>handlePotvrdu(eachZahtjev)}>Potvrdi</Button>
                            <Button onClick={()=>handleBrisanje(eachZahtjev)}>Izbrisi</Button>
                        </div>
                    )) : <h4>Trenutno nema nijednog zahtijeva za pokretanje udruge</h4>
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

export default Zahtjevi;