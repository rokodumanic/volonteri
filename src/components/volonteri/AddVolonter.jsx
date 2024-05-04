
import { Modal } from "react-bootstrap";
import VolonterForm from "./VolonterForm";

function AddVolonter({onClose}){


    return (
        <Modal  show={true} onHide={onClose}>
          <Modal.Header closeButton>
            <Modal.Title>Postani volonter</Modal.Title>
          </Modal.Header>

          <Modal.Body>
              <VolonterForm />
          </Modal.Body>
  
        </Modal>
    );
}

export default AddVolonter;