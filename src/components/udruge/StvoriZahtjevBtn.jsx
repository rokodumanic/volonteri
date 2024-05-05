import { useState } from "react";
import { Button } from "react-bootstrap";
import StvoriZahtjev from "./StvoriZahtjev";

function StvoriZahtjevBtn(){
    const [isClicked, setClicked] = useState(false)

    function handleClick(){
        setClicked(true);
    }

    function handleClose(){
        setClicked(false);
    }

    return(
        <div>
        <Button onClick={handleClick}>Prijavi udrugu</Button>
        {isClicked && <StvoriZahtjev onClose={handleClose}/>}
        </div>
    );
}
export default StvoriZahtjevBtn;