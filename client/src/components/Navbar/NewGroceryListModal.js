import { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";

function NewGroceryListModal() {

  //States responsible for modal display
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [show, setShow] = useState(false);

  const [input, setInput] = useState('');

  const handleSubmit = (e) => {

    axios
    .post(`${process.env.REACT_APP_API_URL}/grocery_lists`, {
      user_id: 2,
      name: input,
    })
    .then((res) => {
      console.log("New grocery list submitted!", res.data)
    })
    .catch((err) => {
      console.log("Grocery list submssion error", err);
    });
  }

  const handleChange = (e) => {
    console.log(e.target.value);
    setInput(e.target.value)
  }

  return (
    <>
      <Button size="sm" variant="custom-button" onClick={handleShow}>
        + New Grocery List
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>New Grocery List</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <Form name="grocery-submit">
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Grocery List Name</Form.Label>
              <Form.Control type="text" placeholder="Name your new Grocery List" onChange={handleChange} />
            </Form.Group>
            <Button variant="primary" type="button" onClick={handleSubmit}>
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default NewGroceryListModal;
