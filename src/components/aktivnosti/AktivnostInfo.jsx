import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import ModalInfo from "./ModalInfo";
import { useContext } from "react";
import AppContext from "../../kontekst";
import ModalPrijava from "./ModalPrijava";
import AktivnostVolonteri from "./AktivnostVolonteri";
import GMaps from "./GMaps";

function AktivnostInfo({ onClose }) {
  const data = useContext(AppContext);
  const info = data.kontekst.aktivnosti.find(
    (obj) => obj.id === data.kontekst.selected
  );

  console.log("AktivnostInfo", info);
  return (
    <Modal show={true} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>{info.naziv}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div className="aktModalBody">
          <ModalInfo />
          <GMaps grad={info.lokacija} />
        </div>
        <ModalPrijava />
        {info.volonteri != undefined && <AktivnostVolonteri />}
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default AktivnostInfo;
