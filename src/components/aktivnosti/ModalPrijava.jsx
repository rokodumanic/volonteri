import { useContext, useEffect, useState } from "react";
import AppContext from "../../kontekst";
import { Button } from "react-bootstrap";
import { nanoid } from 'nanoid'
import axios from "axios";

function ModalPrijava(){
    const data = useContext(AppContext);
    let info = {...data.kontekst.aktivnosti.find(obj => obj.id === data.kontekst.selected)}
    const [volonter,setVolonter] = useState({
      ime:"",
      prezime:""
    })
    

    useEffect(()=>{
      if(volonter.id != ""){
        prijaviVolontera()
      }
    },[volonter.id])

    function structureData(res){
      console.log("structureData", info, res, volonter);
    }

    async function prijaviVolontera(){
      if(volonter.id != ""){
        await axios.get(`http://localhost:3001/aktivnosti/${info.id}`)
          .then((res)=>structureData(res))
          .then(()=>{ return axios.patch(`http://localhost:3001/aktivnosti/${info.id}`, {...info})})
        .then(rez => console.log("REZ",rez))
        .catch(err => console.log(err.message)); 
      } else{ return ;}
    }

    function handleInputChange(e){
        const { name, value } = e.target;
            setVolonter({...volonter, [name]: value });
        }
     

    function handlePrijava(){
        let arr = data.kontekst;
        console.log("VOLONTER", volonter);
        if(info.volonteri==undefined){
          arr.aktivnosti.find(obj => obj.id === data.kontekst.selected).volonteri = [{...volonter, id:nanoid()}];
        } else if(info.volonteri != undefined){
          arr.aktivnosti.find(obj => obj.id === data.kontekst.selected).volonteri.push({...volonter, id:nanoid()});
        } else return;
      console.log("DATA Before:", data.kontekst);
      data.setKontekst({...arr});
      console.log("DATA After:", data.kontekst);
    }

    return(
      <form className="prijavaAkt">
        <div>
          <label className="prijavaAktLabel">
            Ime:          </label>

            <input
                type='text'
                name='ime'
                value={volonter.ime}
                onChange={(e)=>handleInputChange(e)}
                className="addInput"
                required
            />
          <label className="prijavaAktLabel">
            Prezime:</label>
            <input
                type='text'
                name='prezime'
                value={volonter.prezime}
                onChange={(e)=>handleInputChange(e)}
                className="addInput"
            />
          
          </div>
          <div className="prijavaAktButtonContainer">
          <Button variant="dark" onClick={handlePrijava}>Prijavi se</Button>
          </div>
      </form>
    );
}

export default ModalPrijava;