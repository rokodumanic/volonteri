import { Modal } from "react-bootstrap";
import UdrugaForm from "./UdrugaForm";

export function StvoriZahtjev({onClose}){
    
        return (
            <Modal  show={true} onHide={onClose}>
              <Modal.Header closeButton>
                <Modal.Title>Stvori udrugu za volontere</Modal.Title>
              </Modal.Header>
    
              <Modal.Body>
                  <UdrugaForm onClose={onClose} />
              </Modal.Body>
      
            </Modal>
        );
    };