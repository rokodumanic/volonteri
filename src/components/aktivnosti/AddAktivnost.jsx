import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useContext } from 'react';
import AppContext from '../../kontekst';
import AddForm from './AddForm';

function AddAktivnost({onClose}){
    const data = useContext(AppContext);
    const info = data.kontekst.aktivnosti.find(obj => obj.id === data.kontekst.selected);

    console.log("AktivnostInfo", info)
    return (
    
        <Modal  show={true} onHide={onClose}>
          <Modal.Header closeButton>
            <Modal.Title>Stvori Aktivnost</Modal.Title>
          </Modal.Header>
  
          <Modal.Body>
              <AddForm />
          </Modal.Body>
  
        </Modal>
    );
}

export default AddAktivnost;