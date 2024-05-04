import axios from "axios";
import { useContext, useEffect } from "react";
import AppContext from "../../kontekst";

function GalerijaVolontera(){
    const data = useContext(AppContext);

        useEffect(()=>{
            getVolonteri()
        },[])
    
        async function getVolonteri(){      
              await axios.get('http://localhost:3001/volonteri')
            .then(response => {
              console.log("getAktivnosti",response.data);
              return response.data;
            })
            .then((res)=>{data.setKontekst( {...data.kontekst , volonteri: res});
            console.log("AKT:", res, "\n", "data:", data.kontekst.volonteri);})
            .catch(error => {
              console.error('There was a problem with the GET request:', error);
            });
          }

    return(
        <div>
            {data.kontekst.volonteri != undefined &&
                data.kontekst.volonteri.map((eachVol)=>(
                    <div style={styles.card}>
                        <p>{eachVol.ime}</p>
                        <p>Grad: {eachVol.lokacija}</p>
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