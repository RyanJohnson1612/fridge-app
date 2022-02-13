import React from 'react';
import './FridgeItem.scss';
import { BsCart4, BsTrash } from 'react-icons/bs';

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

  return (
    <>
      <div className='body'>
        <img src={props.image} className='image' />
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
                <td><strong>{props.expireIn} Days</strong></td>
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
          <BsCart4 size={40} />
        </div>
        <div>
          <p>Clear item from Fridge?</p>
          <BsTrash size={40} />
        </div>
      </div>
    </>
  );
}

export default FridgeItem;
