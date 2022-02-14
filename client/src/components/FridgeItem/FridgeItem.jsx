import React from 'react';
import './FridgeItem.scss';
import { BsCart4, BsTrash } from 'react-icons/bs';
import axios from 'axios';
import swal from 'sweetalert';

const FridgeItem = (props) => {

  const daysAgo = (days) => {
    if (days === 0) {
      return "Today";
    } else if (days === 1) {
      return `${days} day ago`;
    } else {
      return `${days} days ago`;
    }
  };

  const onAdd = (event) => {
    event.preventDefault();

    axios.post('http://localhost:8080/grocery_lists/3', { name: props.name, grocery_list_id: 3 })
      .then((results) => {
        console.log(results);
        swal("Success!", `${props.name} has been added to your grocery list.`, "success");
      })
      .catch(err => {
        console.log(err)
        swal("Oops!", "There was an error with your request. Please try again in a few minutes.", "error");
      });
  }

  const onDelete = (event) => {
    event.preventDefault();

    console.log(props.id)
    axios.delete(`http://localhost:8080/fridge_items/${props.id}`)
      .then(() => {
        swal("Success!", `${props.name} has been removed from your fridge.`, "success");
      })
      .catch(err => {
        console.log(err)
        swal("Oops!", "There was an error with your request. Please try again in a few minutes.", "error");
      });
  }

  return (
    <>
      <div className='body'>
        <img src={props.image} className='image' alt="" />
        <br />
        <table className='properties'>
          <tbody>
            <tr>
              <td width="40%">Food Item:</td>
              <td><strong>{props.name}</strong></td>
            </tr>
            <tr>
              <td>Category:</td>
              <td><strong>{props.category}</strong></td>
            </tr>
            <tr>
              <td>Date Purchased:</td>
              <td><strong>{props.dateStored}</strong></td>
            </tr>
            <tr>
              <td>Been in the Fridge since:</td>
              <td><strong>{daysAgo(props.storedSince)}</strong></td>
            </tr>
            { props.expiry &&
              <tr>
                <td>Expiry Date:</td>
                <td><strong>{props.expiry}</strong></td>
              </tr>
            }
            { props.expiry &&
              <tr>
                <td>Days Until Expiry:</td>
                <td><strong>{props.expireIn} days</strong></td>
              </tr>
            }
            <tr>
              <td>Notes:</td>
              <td><strong>{props.notes}</strong></td>
            </tr>
          </tbody>

        </table>
      </div>
      <br />
      <div className='click-from-item'>
        <div>
          <p>Add to Grocery List?</p>
          <button>
            <BsCart4 size={40} onClick={onAdd} />
          </button>
        </div>
        <div>
          <p>Clear item from Fridge?</p>
          <button>
            <BsTrash size={40} onClick={onDelete} />
          </button>
        </div>
      </div>
    </>
  );
}

export default FridgeItem;
