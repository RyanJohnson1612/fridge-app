import React, { useState, /*useContext*/ } from "react";
import axios from "axios";
import { Button, Card, Form } from 'react-bootstrap';
import CardHeader from "react-bootstrap/esm/CardHeader";
import swal from 'sweetalert';
import './AddFridgeItem.scss';
// import { authContext } from '../../providers/AuthProvider';

axios.defaults.withCredentials = false;

const AddFridgeItem = (props) => {

  const [name, setName] = useState("");
  const [expiry, setExpiry] = useState("");
  const [category, setCategory] = useState("Grain");
  const [notes, setNotes] = useState("");

  // const { user } = useContext(authContext);

  const foodApiKey = '7d6a61fad9b24db6985482b1ae5a6954';

  const submitItem = (event) => {
    event.preventDefault();
    console.log(name, expiry, category, notes);

    let queryExpiry = expiry;

    if (expiry === "") {
      queryExpiry = null;
    }

    axios.get(`https://api.spoonacular.com/food/ingredients/search?apiKey=${foodApiKey}&query=${name}`)
      .then((response) => {
        console.log(response.data.results);
        console.log(response.data.results[0].image);
        const itemList = response.data.results;
        let image = response.data.results[0].image;

        if (image.includes("png")) {
          image = response.data.results[1].image;
        }

        for (const item of itemList) {
          if (item.image !== "no.jpg" && item.image !== "no.png" && item.image.includes(name)) {
            image = item.image;
            break;
          }
        }
        const formatImage = image.slice(0, -3);
        const image_URL = `https://spoonacular.com/cdn/ingredients_500x500/${formatImage}jpg`;
        axios.post(`${process.env.REACT_APP_API_URL}/fridge_items`, { name, expiry: queryExpiry, category, image_URL, notes })
          .then((results) => {
            console.log(results.data);
            swal("Success!", `${name} has been added to your fridge.`, "success");

          })
          .catch(err => {
            console.log(err)
            swal("Oops!", "There was an error with your request. Please try again in a few minutes.", "error");
          });
      }).catch((error) => console.log("Error:", error.message))
  };

  const list = ["Grain", "Vegetable", "Fruit", "Dairy", "Meat", "Seafood", "Alternative Protein", "Dessert", "Condiment", "Other"];

  const categoryList = list.map(category => {
    return (
      <option key={category} value={category}>{category}</option>
    )
  });

  return (
    <Card className="add-item-card">
      <CardHeader className="add-item-header"><strong>Add a Fridge Item</strong></CardHeader>
      <Card.Body>
        <Form onSubmit={submitItem}>
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
            <Form.Select defaultValue="" required onChange={(event) => setCategory(event.target.value)}>
              <option value="" disabled hidden>Select a category:</option>
              {categoryList}
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
            variant={'primary'}
          >
            Add to Fridge
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default AddFridgeItem;
