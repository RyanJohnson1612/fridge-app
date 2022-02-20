import { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from 'react-router-dom'


function NewGroceryListModal({setAllGroceryLists, allGroceryLists}) {

  //States responsible for modal display
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [show, setShow] = useState(false);

  const [input, setInput] = useState('');

  const navigate = useNavigate();

  const handleChange = (e) => {
    console.log(e.target.value);
    setInput(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
    .post(`${process.env.REACT_APP_API_URL}/grocery_lists`, {
      user_id: 2,
      name: input,
    })
    .then((res) => {
      console.log("New grocery list submitted!", res.data)
      setAllGroceryLists([...allGroceryLists, res.data])
      navigate(`/grocery-list/${res.data.id}`)
    })
    .catch((err) => {
      console.log("Grocery list submssion error", err);
    });

    handleClose();
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

          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Grocery List Name</Form.Label>
              <Form.Control type="text" placeholder="Name your new Grocery List" onChange={handleChange} />
            </Form.Group>
            <Button variant="primary" type="button" onClick={(e) => handleSubmit(e)}>
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default NewGroceryListModal;
