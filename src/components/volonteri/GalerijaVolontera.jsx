import axios from "axios";
import { useContext, useEffect } from "react";
import AppContext from "../../kontekst";

function GalerijaVolontera(){
    const data = useContext(AppContext);

        useEffect(()=>{
            if(!data.kontekst.fresh) {getVolonteri()}
        },[data.kontekst.fresh])
    
        async function getVolonteri(){ 
            data.setKontekst({...data.kontekst, fresh:true})
     
              await axios.get('http://localhost:3001/volonteri')
            .then(res => {
              console.log("getAktivnosti",res.data);
              data.setKontekst( {...data.kontekst , volonteri: [...res.data]})})
            .catch(error => {
              console.error('There was a problem with the GET request:', error);
            });
          }

    return(
        <div >
            {data.kontekst.volonteri != undefined &&
                data.kontekst.volonteri.map((eachVol)=>(
                    <div key={eachVol.id} style={styles.card}>
                        <p>{eachVol.ime}</p>
                        <p>Grad: {eachVol.grad}</p>
                        <p>Kontakt: {eachVol.kontakt}</p>
                        {eachVol.aktivnosti != undefined ? <span>Kategorije volontiranja: </span> : 
                            <span>Nema preference za tip rada</span>} 
                        {eachVol.aktivnosti != undefined && eachVol.aktivnosti.map((eachKat, index)=>(
                            index === 0 ? <span>{eachKat}</span>: <span>, {eachKat}</span>
                            
                        ))}
                    </div>
                ))
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

export default GalerijaVolontera;