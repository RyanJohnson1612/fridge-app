import { useState } from 'react';
import { Modal, Button } from "react-bootstrap";

function NewGroceryListModal() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="light" bg="myTeal" onClick={handleShow}>
        Make new Grocery List
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Make a new Grocery List</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Hello! This is the Modal.
        </Modal.Body>
        <Modal.Footer>
          This is the footer
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default NewGroceryListModal;
