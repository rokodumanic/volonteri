import { useContext } from "react";
import AppContext from "../../kontekst";
import { Modal } from "react-bootstrap";

function AddVolonter(){


    return (
        <Modal  show={true} onHide={onClose}>
          <Modal.Header closeButton>
            <Modal.Title>{info.naziv}</Modal.Title>
          </Modal.Header>
  
          <Modal.Body>
              
          </Modal.Body>
  
          <Modal.Footer>
            <Button variant="secondary" onClick={onClose}>Close</Button>
          </Modal.Footer>
        </Modal>
    );
}

export default AddVolonter;