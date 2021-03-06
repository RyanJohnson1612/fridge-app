import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { Button, Card, Form, Spinner } from 'react-bootstrap';
import CardHeader from "react-bootstrap/esm/CardHeader";
import swal from 'sweetalert';
import './AddFridgeItem.scss';
import { useNavigate } from 'react-router-dom'
import classNames from 'classnames';
import { authContext } from '../../providers/AuthProvider';
import { AiFillPlusCircle } from 'react-icons/ai';
import Camera from '../Camera/Camera';
import usePredictions from '../../hooks/usePredictions/usePredictions';

axios.withCredentials = false;

const AddFridgeItem = (props) => {

  const [name, setName] = useState( props.groceryName || "" );
  const [expiry, setExpiry] = useState("");
  const [category, setCategory] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [camera, setCamera] = useState(false);
  const navigate = useNavigate();
  const { image, setImage, predictions, getPredictions, predictionsLoading } = usePredictions();
  const { user } = useContext(authContext);

  useEffect(() => {
    if(predictions.length > 0) {
      setName(capitalize(predictions[0].name));
    }
    setCamera(false);
  }, [image, predictions])

  const submitItem = (event) => {
    setLoading(true);
    event.preventDefault();
    // console.log(name, expiry, category, notes);

    let queryExpiry = expiry;
    const trimName = name.trim();
    const capName = trimName[0].toUpperCase() + trimName.slice(1);
    const dbName = trimName.toLowerCase();

    if (expiry === "") {
      queryExpiry = null;
    }

    if (!image) {
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

          uploadFoodItem({ name: dbName, fridge_id: user.id, expiry: queryExpiry, category, image_URL, notes });
        }).catch((err) => {
          console.log("Error:", err.message)
          swal("Oops!", "There was an error with your request. Please try again in a few minutes.", "error");
        });
    } else {
      uploadFoodItem({ name: dbName, fridge_id: user.id, expiry: queryExpiry, category, image_URL: image, notes });
    }
  };

  const uploadFoodItem = (data) => {
    axios.post(`${process.env.REACT_APP_API_URL}/fridge_items`, data)
          .then(() => {
            setLoading(false);

            if (props.groceryName) {
              swal({
                title: "Success!",
                text: `${capitalize(data.name)} has been added to your fridge.`,
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
                text: `${capitalize(data.name)} has been added to your fridge.`,
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
            setLoading(false);
            swal("Oops!", "There was an error with your request. Please try again in a few minutes.", "error");
          });
  }

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
        <Form.Label>Take a Picture</Form.Label>
        <div className={camera || image ? 'form-image form-image--open' : 'form-image form-image--closed'}>
          { camera &&
            <>
              <Camera cb={getPredictions} loading={predictionsLoading} />
              <Button variant={'danger'} onClick={() => setCamera(false)}>Cancel</Button>
            </>
          }
          { !camera && !image &&
            <>
              <div className="form-image__toggle" onClick={() => setCamera(true)} >
                <AiFillPlusCircle/>
              </div>
            </>
          }
          { image && !camera &&
            <div className="form-image__results">
              <figure>
                <img src={image} alt={capitalize(name)} />
              </figure>
              <Button variant={'danger'} onClick={() => setImage(null)}>Delete</Button>
              <Button onClick={() => setCamera(true)}>Retake Picture</Button>
            </div>
          }
        </div>
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
            {predictions.length > 0 &&
            <Form.Text>
              Incorrect food item?
              <br/>
              {
                predictions.slice(1, 6).map(prediction => {
                  return (
                    <li
                      className="form-name_item"
                      onClick={() => setName(capitalize(prediction.name))}
                      key={prediction.id}>
                        {capitalize(prediction.name)}
                    </li>
                  )
                })
              }
            </Form.Text>
            }
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
