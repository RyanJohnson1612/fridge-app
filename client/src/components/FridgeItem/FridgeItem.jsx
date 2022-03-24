import React from 'react';
import './FridgeItem.scss';
import { BsCart4, BsTrash } from 'react-icons/bs';
import axios from 'axios';
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom'
import classNames from "classnames";

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

  const expiredAgo = (days) => {
    if (days > 1) {
      return `${days} days`;
    } else if (days === 1) {
      return `1 day`;
    } else if (days === 0) {
      return "Expires today";
    } else if (days === -1) {
      return "Expired " + (days * -1) + " day ago";
    } else {
      return "Expired " + (days * -1) + " days ago";
    }
  }

  const expiredClass = classNames({ 'expired': props.fridgeItem.expire_in <= 0, 'expire-soon': props.fridgeItem.expire_in > 0 && props.fridgeItem.expire_in <= 3 });

  const onAdd = () => {
    const selectedGroceryList = props.allGroceryLists.filter((groceryList) => groceryList.id === props.groceryList);

    axios.post(`${process.env.REACT_APP_API_URL}/grocery_lists/${props.groceryList}`, { name: props.fridgeItem.name, grocery_list_id: props.groceryList, obtained: false }, { withCredentials: true })
      .then(() => {
        if (props.modalId) {
          swal("Success!", `${capitalize(props.fridgeItem.name)} has been added to your ${selectedGroceryList[0].name} grocery list.`, "success");
          props.closeModal();
        } else {
          swal("Success!", `${capitalize(props.fridgeItem.name)} has been added to your ${selectedGroceryList[0].name} grocery list.`, "success");
        }
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
        axios.put(`${process.env.REACT_APP_API_URL}/fridge_items/${props.fridgeItem.id}`, { withCredentials: true })
          .then(() => {
            if (props.modalId) {
              swal("Success!", `${capitalize(props.fridgeItem.name)} has been removed from your fridge.`, "success");
              props.closeModal();
              navigate('/');
            } else {
              swal("Success!", `${capitalize(props.fridgeItem.name)} has been removed from your fridge.`, "success");
              navigate('/fridge');
            }
          })
          .catch(err => {
            console.log(err)
            swal("Oops!", "There was an error with your request. Please try again in a few minutes.", "error");
          });
      };
    });
  }

  const capitalize = (name) => {
    const capName = name[0].toUpperCase() + name.slice(1);
    return capName;
  }

  const groceryListOptions = props.allGroceryLists.map((groceryList) => {
    return (
      <option value={groceryList.id} key={groceryList.id} name={groceryList.name}>
        {groceryList.name}
      </option>
    )
  })

  return (
    <div className='fridge-item-box'>
      <div className='body'>
        <div className='image-container'>
          <figure>
            <img src={props.fridgeItem.image_url} className='image' alt="" />
          </figure>
        </div>
        <br />
        <table className='properties'>
          <tbody>
            <tr>
              <td width="40%"><strong>Food Item:</strong></td>
              <td>{ props.fridgeItem.name ? capitalize(props.fridgeItem.name) : "" }</td>
            </tr>
            <tr>
              <td><strong>Category:</strong></td>
              <td>{ props.fridgeItem.category ? capitalize(props.fridgeItem.category) : "" }</td>
            </tr>
            <tr>
              <td><strong>Date Purchased:</strong></td>
              <td>{props.fridgeItem.date_stored}</td>
            </tr>
            <tr>
              <td><strong>Been in the Fridge since:</strong></td>
              <td>{daysAgo(props.fridgeItem.stored_since)}</td>
            </tr>
            { props.fridgeItem.expiry &&
              <tr>
                <td><strong>Expiry Date:</strong></td>
                <td>{props.fridgeItem.expiry}</td>
              </tr>
            }
            { props.fridgeItem.expiry &&
              <tr>
                <td><strong>Days Until Expiry:</strong></td>
                <td className={expiredClass}>{expiredAgo(props.fridgeItem.expire_in)}</td>
              </tr>
            }
            <tr>
              <td><strong>Notes:</strong></td>
              <td>{props.fridgeItem.notes}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <br />
      <br />
      <div className='click-from-item'>
        <div>
          <p>
            Add to a Grocery List? &nbsp;
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
      <br />
    </div>
  );
}

export default FridgeItem;
