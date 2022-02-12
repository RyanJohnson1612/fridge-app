import React from 'react';
import './FridgeItem.scss';

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
    <div className='body'>
      <img src={props.image} className='image' />
      <table className='properties'>
        <tbody>
          <tr>
            <td>Food Item: </td>
            <td>{props.name}</td>
          </tr>
          <tr>
            <td>Category: </td>
            <td>{props.category}</td>
          </tr>
          <tr>
            <td>Date Purchased: </td>
            <td>{props.dateStored}</td>
          </tr>
          <tr>
            <td>Been in the Fridge since how long: </td>
            <td>{daysAgo(props.storedSince)}</td>
          </tr>
          { props.expiry ?
            <tr>
              <td>Expiry Date: </td>
              <td>{props.expiry}</td>
            </tr>
          : "" }
          { props.expiry ?
            <tr>
              <td>Time Remaining: </td>
              <td>{props.expireIn} Days</td>
            </tr>
          : ""}
          <tr>
            <td>Notes: </td>
            <td>{props.notes}</td>
          </tr>
        </tbody>
      </table>
    </div>

  );
}

export default FridgeItem;
