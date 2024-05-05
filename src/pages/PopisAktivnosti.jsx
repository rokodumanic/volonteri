import { useContext, useEffect, useState } from 'react';
import AppContext from '../kontekst';
import axios from 'axios';
import AktivnostInfo from '../components/aktivnosti/AktivnostInfo';
import AddAktivnost from '../components/aktivnosti/AddAktivnost';
import { Button } from 'react-bootstrap';

function PopisAktivnosti(){
    const data = useContext(AppContext);
    
    const [isInfoVisible, setInfoVis] = useState(false);
    const [isAddVis, setAddVis] = useState(false);

    
    useEffect(()=>{
        getAktivnosti()
    },[])

    async function getAktivnosti(){      
          await axios.get('http://localhost:3001/aktivnosti')
        .then((res)=>{data.setKontekst( {...data.kontekst , aktivnosti: res.data});
        console.log("AKT:", res.data, "\n", "data:", data.kontekst.aktivnostic);})
        .catch(error => {
          console.error('There was a problem with the GET request:', error);
        });
      }

      async function handleBrisanje(obj) {
        await axios
          .delete(`http://localhost:3001/aktivnosti/${obj.id}`)
          .then((res) => {
            console.log("Res brisanje:", res.data);
          })
          .then(async() => await getAktivnosti())
          .catch((err) => console.log("Error:", err));
      }

    function handleClick(aktivnost){
        data.setKontekst({...data.kontekst , selected: aktivnost.id});
        setInfoVis(true);
    }

    function closeEditModal(){
        setInfoVis(false);
        data.setKontekst({...data.kontekst , selected: null});
      };

      function handleAdd(){
        setAddVis(true);
    }

    function closeAddModal(){
        setAddVis(false);
      };

    return(<>
    {isInfoVisible=== true ? 
          <AktivnostInfo 
            onClose={()=>closeEditModal()}
          />
         : null}
    {isAddVis=== true ? 
          <AddAktivnost 
            onClose={()=>closeAddModal()}
          />
         : null}
    {data.kontekst.aktivnosti.map((aktivnost)=>( 
        <div style={styles.card}>
            <div onClick={()=>handleClick(aktivnost)}>
            <h2>{aktivnost.naziv}</h2>
            <p>Datum: {aktivnost.datum}</p>
            <p>Grad: {aktivnost.lokacija}</p>
            </div>
            {data.kontekst.uloga==="administrator" && 
              <Button onClick={()=>handleBrisanje(aktivnost)}>Izbrisi aktivnost</Button>}
        </div>))}
        <Button onClick={handleAdd}>+</Button>
        </>)
    };
    
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

export default PopisAktivnosti;