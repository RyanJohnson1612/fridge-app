import React from 'react';
import './FridgeItem.scss';
import { BsCart4, BsTrash } from 'react-icons/bs';
import axios from 'axios';
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom'

const FridgeItem = (props) => {

  const navigate = useNavigate();

  const daysAgo = (days) => {
    if (days === 0) {
      return "Today";
    } else if (days === 1) {
      return `${days} day ago`;
    } else {
      return `${days} days ago`;
    }
  };

  const onAdd = () => {
    const selectedGroceryList = props.allGroceryLists.filter((groceryList) => groceryList.id === props.groceryList);

    axios.post(`http://localhost:8080/grocery_lists/${props.groceryList}`, { name: props.fridgeItem.name, grocery_list_id: props.groceryList })
      .then((results) => {
        console.log(results);
        swal("Success!", `${props.fridgeItem.name} has been added to your ${selectedGroceryList[0].name} grocery list.`, "success");

      })
      .catch(err => {
        console.log(err)
        swal("Oops!", "There was an error with your request. Please try again in a few minutes.", "error");
      });
  }

  const onDelete = () => {
    swal({
      title: "Are you sure?",
      icon: "warning",
      buttons: true,
      dangerMode: true
    })
    .then((confirm) => {
      if (confirm) {
        axios.put(`http://localhost:8080/fridge_items/${props.fridgeItem.id}`)
          .then(() => {
            swal("Success!", `${props.fridgeItem.name} has been removed from your fridge.`, "success");
            props.setFridgeItem({});
            navigate('/fridge');
          })
          .catch(err => {
            console.log(err)
            swal("Oops!", "There was an error with your request. Please try again in a few minutes.", "error");
          });
      };
    });
  }

  const groceryListOptions = props.allGroceryLists.map((groceryList) => {
    return (
      <option value={groceryList.id} key={groceryList.id} name={groceryList.name}>
        {groceryList.name}
      </option>
    )
  })

  return (
    <>
      <div className='body'>
        <img src={props.fridgeItem.image_url} className='image' alt="" />
        <br />
        <table className='properties'>
          <tbody>
            <tr>
              <td width="40%">Food Item:</td>
              <td><strong>{props.fridgeItem.name}</strong></td>
            </tr>
            <tr>
              <td>Category:</td>
              <td><strong>{props.fridgeItem.category}</strong></td>
            </tr>
            <tr>
              <td>Date Purchased:</td>
              <td><strong>{props.fridgeItem.date_stored}</strong></td>
            </tr>
            <tr>
              <td>Been in the Fridge since:</td>
              <td><strong>{daysAgo(props.fridgeItem.stored_since)}</strong></td>
            </tr>
            { props.fridgeItem.expiry &&
              <tr>
                <td>Expiry Date:</td>
                <td><strong>{props.fridgeItem.expiry}</strong></td>
              </tr>
            }
            { props.fridgeItem.expiry &&
              <tr>
                <td>Days Until Expiry:</td>
                <td><strong>{props.fridgeItem.expire_in} days</strong></td>
              </tr>
            }
            <tr>
              <td>Notes:</td>
              <td><strong>{props.fridgeItem.notes}</strong></td>
            </tr>
          </tbody>
        </table>
      </div>
      <br />
      <div className='click-from-item'>
        <div>
          <p>
            Add to Grocery List? &nbsp;
            <select name='groceryList' onChange={(event) => props.setGroceryList(parseInt(event.target.value))}>
              {groceryListOptions}
            </select>
          </p>
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
