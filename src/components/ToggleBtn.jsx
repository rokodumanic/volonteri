import React, { useState, useContext} from 'react';
import { ToggleButton, ButtonGroup } from 'react-bootstrap';
import AppContext from '../kontekst';

const CustomToggleButton = () => {
  const value = useContext(AppContext);

  console.log("EEEE", value, value.kontekst);


  const handleChange = (e) => {
    console.log("EEEE", e, value);
    if(value.kontekst.uloga==="korisnik"){
        value.setKontekst({...value.kontekst, uloga: "administrator"})
    }else if( value.kontekst.uloga==="administrator"){
            value.setKontekst({...value.kontekst, uloga: "korisnik"})
}};

  return (
    <ButtonGroup toggle className="mb-2">
      <ToggleButton
        type="checkbox"
        variant="primary"
        checked={value=="korisnik"?1:0}
        value="korisnik"
        onClick={(e) => handleChange(e)}
      >
        {value.kontekst.uloga}
      </ToggleButton>
    </ButtonGroup>
  );
};

export default CustomToggleButton;
