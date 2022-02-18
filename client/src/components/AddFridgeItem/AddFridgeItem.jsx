import React, { useState, useContext } from "react";
import axios from "axios";
import { Button, Card, Form, Spinner } from 'react-bootstrap';
import CardHeader from "react-bootstrap/esm/CardHeader";
import swal from 'sweetalert';
import './AddFridgeItem.scss';
import { useNavigate } from 'react-router-dom'
import classNames from 'classnames';
import { authContext } from '../../providers/AuthProvider';
axios.withCredentials = false;

const AddFridgeItem = (props) => {

  const [name, setName] = useState( props.groceryName || "" );
  const [expiry, setExpiry] = useState("");
  const [category, setCategory] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const { user } = useContext(authContext);

  const submitItem = (event) => {
    setLoading(true);
    event.preventDefault();
    // console.log(name, expiry, category, notes);

    let queryExpiry = expiry;
    const capName = name[0].toUpperCase() + name.slice(1);
    const dbName = name.toLowerCase();

    if (expiry === "") {
      queryExpiry = null;
    }

    axios.get(`https://api.spoonacular.com/food/ingredients/search?apiKey=${process.env.REACT_APP_FOOD_API_KEY}&query=${name}`)
      .then((response) => {
        // console.log(response.data.results);
        const itemList = response.data.results;
        let image = "no.jpg";

        for (const item of itemList) {
          if (item.image !== "no.jpg" && item.image !== "no.png" && item.image.includes(dbName)) {
            image = item.image;
            break;
          }
        }

        const image_URL = `https://spoonacular.com/cdn/ingredients_500x500/${image}`;

        axios.post(`${process.env.REACT_APP_API_URL}/fridge_items`, { name: dbName, fridge_id: user.id, expiry: queryExpiry, category, image_URL, notes })
          .then(() => {
            setLoading(false);

            if (props.groceryName) {
              swal({
                title: "Success!",
                text: `${capName} has been added to your fridge.`,
                icon: "success",
                buttons: {
                  cancel: {
                    text: "Close",
                    value: null,
                    visible: true,
                    closeModal: true,
                  },
                  confirm: {
                    text: "See your fridge",
                    value: true,
                    visible: true,
                    closeModal: true
                  }
                }
              })
                .then((value) => {
                  if (value) {
                    navigate('/fridge');
                  } else {
                    props.closeModal();
                  }
                })
                .catch((err) => console.log("Err:", err.message));
            } else {
              swal({
                title: "Success!",
                text: `${capName} has been added to your fridge.`,
                icon: "success",
                buttons: {
                  cancel: {
                    text: "Add another item",
                    value: null,
                    visible: true,
                    closeModal: true,
                  },
                  confirm: {
                    text: "See your fridge",
                    value: true,
                    visible: true,
                    closeModal: true
                  }
                }
              })
                .then((value) => {
                  if (value) {
                    navigate('/fridge');
                  } else {
                    setName("");
                    setExpiry("");
                    setNotes("");
                  }
                })
                .catch((err) => console.log("Err:", err.message));
              }
          })
          .catch(err => {
            console.log(err)
            swal("Oops!", "There was an error with your request. Please try again in a few minutes.", "error");
          });
      }).catch((err) => {
        console.log("Error:", err.message)
        swal("Oops!", "There was an error with your request. Please try again in a few minutes.", "error");
      });
  };

  const list = ["grain", "vegetable", "fruit", "dairy", "meat", "seafood", "alternative protein", "dessert", "drinks", "condiment", "other"];

  const fridgeItemHeader = classNames("add-item-card", { "fridge-modal": props.groceryName });

  const capitalize = (name) => {
    const capName = name[0].toUpperCase() + name.slice(1);
    return capName;
  }

  const categoryList = list.map(category => {
    return (
      <option key={category} value={category}>{capitalize(category)}</option>
    )
  });

  return (
    <Card className={fridgeItemHeader}>
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
          { !loading ?
            <Button
              className="add-item-button"
              type="submit"
              variant={'primary'}>
              Add to Fridge
            </Button>
            : (
            <div>
              <Spinner animation="border" variant="secondary" className="spin" />
            </div>
          )}
        </Form>
      </Card.Body>
    </Card>
  );
}

export default AddFridgeItem;
