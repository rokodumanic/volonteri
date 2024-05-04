import { useState } from "react";
import { Button } from "react-bootstrap";
import AddVolonter from "./AddVolonter";

function Filteri(){
    const [isVisible, setVis] = useState(false);

    function showModal(){
        setVis(true);
    }

    function closeModal(){
        setVis(false);
    }

    return(
        <div>
            {isVisible===true && 
                <AddVolonter onClose={()=>closeModal()}/>
            }

            <Button onClick={showModal}>Novi Volonter</Button>
        </div>
    );
}

export default Filteri;