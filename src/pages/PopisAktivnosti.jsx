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

    return(<div className='popAktContainer'>
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
        <div className='card'>
            <div className="aktCardInfo" onClick={()=>handleClick(aktivnost)}>
            <div>
            <h2>{aktivnost.naziv}</h2>
            <p className='infoAkt'>Datum: {aktivnost.datum}</p>
            <p className='infoAkt'>Grad: {aktivnost.lokacija}</p>
            </div>
            <p className="opisAkt">Opis: {aktivnost.opis}</p>
            </div>
            {data.kontekst.uloga==="administrator" && 
              <Button className='izbrisiAkt' variant='danger' onClick={()=>handleBrisanje(aktivnost)}>Izbrisi aktivnost</Button>}
        </div>))}
        <Button className='addSticky' variant='dark' onClick={handleAdd}>Stvori Aktivnost</Button>
        </div>)
    };
    


export default PopisAktivnosti;