import React, { useState, useEffect } from "react";
import { Button, Card, Form } from 'react-bootstrap';
import CardHeader from "react-bootstrap/esm/CardHeader";
import './AddFridgeItem.scss'

const AddFridgeItem = (props) => {

  const [name, setName] = useState("");
  const [expiry, setExpiry] = useState("");
  const [category, setCategory] = useState("Grain");
  const [notes, setNotes] = useState("");

  return (
    <Card className="add-item-card">
      <CardHeader className="add-item-header"><strong>Add a Fridge Item</strong></CardHeader>
      <Card.Body>
        <Form onSubmit={event => event.preventDefault()}>
          <Form.Group className="mb-3" controlId="formGroupName">
            <Form.Label>Food Item</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Enter food name here"
              value={name}
              onChange={event => setName(event.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGroupExpiry">
            <Form.Label>Expiry (Leave blank if unknown)</Form.Label>
            <Form.Control
              type="date"
              value={expiry}
              onChange={event => setExpiry(event.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGroupCategory">
            <Form.Label>Food Category</Form.Label>
            <Form.Select required onChange={(event) => setCategory(event.target.value)}>
              <option value="" disabled selected hidden>Select a category:</option>
              <option value="Grain">Grain</option>
              <option value="Vegetable">Vegetable</option>
              <option value="Fruit">Fruit</option>
              <option value="Dairy">Dairy</option>
              <option value="Meat">Meat</option>
              <option value="Seafood">Seafood</option>
              <option value="Alternative Protein">Alternative Protein</option>
              <option value="Dessert">Dessert</option>
              <option value="Condiment">Condiment</option>
              <option value="Other">Other</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGroupNotes">
            <Form.Label>Notes</Form.Label>
            <Form.Control
              as="textarea"
              placeholder="Add any notes here"
              value={notes}
              onChange={event => setNotes(event.target.value)}
            />
          </Form.Group>
          <Button
            className="add-item-button"
            type="submit"
            variant={'primary'}>
              Add to Fridge
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default AddFridgeItem;
