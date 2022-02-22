import React, { useState } from "react";
import ShoppingListForm from "./ShoppingListForm";
import { RiCloseCircleLine, RiFridgeLine } from "react-icons/ri";
import { TiEdit } from "react-icons/ti";
import AddFridgeItem from "../AddFridgeItem/AddFridgeItem";
import { Modal } from "react-bootstrap";

function ShoppingListItem(props) {
  const {
    items,
    completeItem,
    removeItem,
    updateItem,
    setEditMode,
  } = props;

  const [edit, setEdit] = useState({
    id: null,
    value: "",
  });

  const [show, setShow] = useState(false);
  const [food, setFood] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = (name) => {
    setFood(name);
    setShow(true);
  }

  const submitUpdate = (value) => {
    updateItem(edit.id, value);
    setEdit({
      id: null,
      value: "",
    });
    setEditMode(false);
  };

  /*  If state variable edit.id is true (which occurs after edit icon is clicked),
  return ShoppingListForm while passing submitUpdate function onSubmit */
  if (edit.id) {
    setEditMode(true);
    return (
      <ShoppingListForm
        onSubmit={submitUpdate}
        input={edit.value}
        editMode={true}
      />
    );
  }
  const itemsMapped = items.map((item, index) => (
    // class of item is assigned based on whether item was purchased or not
    <div
      className={item.isPurchased ? "item-row complete" : "item-row"}
      key={index}
    >
      {/* keep track of which item is being clicked on */}
      <div key={item.id} onClick={() => completeItem(item.id)}>
        {item.text}
      </div>

      <div className="icons">
        <RiCloseCircleLine
          onClick={() => removeItem(item.id)}
          className="delete-icon"
        />
        <TiEdit
          onClick={() => setEdit({ id: item.id, value: item.text })}
          className="edit-icon"
        />
        <RiFridgeLine
          onClick={() => handleShow(item.text)}
          className="fridge-icon"
        />
      </div>
    </div>
  ));

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header className='item-modal-header' closeButton>
        </Modal.Header>
        <Modal.Body>
          <AddFridgeItem
            groceryName={food}
            closeModal={handleClose}
          />
        </Modal.Body>
      </Modal>
      {itemsMapped}
    </>
  )
}
export default ShoppingListItem;
