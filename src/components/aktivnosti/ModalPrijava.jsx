import { useContext, useState } from "react";
import AppContext from "../../kontekst";
import { Button } from "react-bootstrap";
import { nanoid } from 'nanoid'

function ModalPrijava(){
    const data = useContext(AppContext);
    let info = data.kontekst.aktivnosti.find(obj => obj.id === data.kontekst.selected)
    const [volonter,setVolonter] = useState({
      ime:"",
      prezime:"",
      id:""
    })

    function handleInputChange(e){
        const { name, value } = e.target;
            setVolonter({...volonter, [name]: value });
        }
     

    function handlePrijava(){
      setVolonter({...volonter, id: info.id+"-"+nanoid()})
      let arr = data.kontekst;
      arr.aktivnosti.find(obj => obj.id === data.kontekst.selected).volonteri.push({volonter});
      console.log("DATA Before:", data.kontekst);
      data.setKontekst({...arr});
      console.log("DATA After:", data.kontekst);
    }

    return(
      <form onSubmit={()=>console.log("JAAAAAAAYYYYYY")}>
        <div>
          <label>
            Ime:
            <input
                type='text'
                name='ime'
                value=""
                onChange={(e)=>handleInputChange(e)}
                className="addInput"
                required
            />
          </label>
          <label>
            Prezime:
            <input
                type='text'
                name='prezime'
                value=""
                onChange={(e)=>handleInputChange(e)}
                className="addInput"
            />
          </label>
          <Button onClick={handlePrijava}>Prijavi se</Button>
        </div>
      </form>
    );
}

export default ModalPrijava;