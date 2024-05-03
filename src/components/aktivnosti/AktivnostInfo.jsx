import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ModalInfo from './ModalInfo';

function AktivnostInfo({onClose}){
    console.log("AktivnostInfo")
    return (
    
        <Modal  show={true} onHide={onClose}>
          <Modal.Header closeButton>
            <Modal.Title>Uredi</Modal.Title>
          </Modal.Header>
  
          <Modal.Body>
              <ModalInfo  />
          </Modal.Body>
  
          <Modal.Footer>
            <Button variant="secondary" onClick={onClose}>Close</Button>
          </Modal.Footer>
        </Modal>
    );
}

export default AktivnostInfo;