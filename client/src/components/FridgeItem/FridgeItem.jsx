import React from 'react';
import './FridgeItem.scss';

const FridgeItem = (props) => {
  return (
    <>
      <img src={props.image} className='image' />
      <div className='properties'>
        <p>{props.name}</p>
        <p>Category: {props.category}</p>
        <p>Date Purchased: {props.dateStored}</p>
        { props.expiry ? <p>Expiry Date: {props.expiry}</p> : "" }
        { props.expiry ? <p>Time Remaining: {props.expiry - props.dateStored}</p> : ""}
        <p>Notes: {props.notes}</p>
      </div>
    </>

  );
}

export default FridgeItem;
