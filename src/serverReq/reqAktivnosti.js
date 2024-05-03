import axios from "axios";
import { useContext, useEffect } from 'react';
import AppContext from '../kontekst';

export async function getAktivnosti(){

  const data = useContext(AppContext);

    await axios.get('http://localhost:3001/aktivnosti')
  .then(response => {
    console.log("getAktivnosti",response.data);
    return response.data;
  })
  .catch(error => {
    console.error('There was a problem with the GET request:', error);
  });

  
}