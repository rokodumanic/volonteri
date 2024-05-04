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
        .then(response => {
          console.log("getAktivnosti",response.data);
          return response.data;
        })
        .then((res)=>{data.setKontekst( {...data.kontekst , aktivnosti: res});
        console.log("AKT:", res, "\n", "data:", data.kontekst.aktivnostic);})
        .catch(error => {
          console.error('There was a problem with the GET request:', error);
        });
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
/*         data.setKontekst({...data.kontekst , selected: aktivnost.id});
 */        setAddVis(true);
    }

    function closeAddModal(){
        setAddVis(false);
/*         data.setKontekst({...data.kontekst , selected: null});
 */      };

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
        <div style={styles.card} onClick={()=>handleClick(aktivnost)}>
            <h2>{aktivnost.naziv}</h2>
            <p>Datum: {aktivnost.datum}</p>
            <p>Grad: {aktivnost.lokacija}</p>
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