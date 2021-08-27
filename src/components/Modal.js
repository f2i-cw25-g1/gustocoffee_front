import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import './css/Modal.css';

const MyVerticallyCenteredModal = (props) => {
    return (
        <Modal
            {...props}
            size="sm"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >

            <Modal.Body>
                <p className="text-center">
                    {props.body}
                </p>
                <h1 className="text-center">{props.logo}</h1>
            </Modal.Body>
            <Modal.Footer className="modal-footer-gusto">
                <Button className="btn-primary-gusto" onClick={props.onHide}>Fermer</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default MyVerticallyCenteredModal;
