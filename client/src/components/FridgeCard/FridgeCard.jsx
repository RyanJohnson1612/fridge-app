import React, { useState } from 'react';
import CheckBox from '../Checkbox/Checkbox';
import classNames from 'classnames';
import { BsFillClockFill } from 'react-icons/bs';
import moment from 'moment';
import FridgeItemIndex from '../FridgeItem';
import { Modal } from 'react-bootstrap';

function FridgeCard(props) {
  const { item, checkboxVisible, onChecked } = props;
  const daysUntilExpired = moment(item.expiry).endOf('day').diff(moment().endOf('day'), 'days');

  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const status = () => {
    if (daysUntilExpired > 3) {
      return 'Fresh';
    } else if (daysUntilExpired <= 3 && daysUntilExpired > 0) {
      return 'Expiring Soon';
    } else if (daysUntilExpired === 0) {
      return 'Expires Today';
    } else if (daysUntilExpired < 0){
      return 'Expired';
    } else {
      return 'Fresh';
    }
  }

  const statusClassName = classNames('fridge-card__status', {
    'fridge-card__status--fresh': status() === 'Fresh',
    'fridge-card__status--expiring': status() === 'Expiring Soon',
    'fridge-card__status--expired': status() === 'Expired' || status() === 'Expires Today',
  })

  return (
    <article className="fridge-card">
      { checkboxVisible && <CheckBox onChecked={onChecked} key={item.id} option={item.name} hideLabel={true} />}
      <button className='fridge-item-modal' onClick={handleShow}>
        <div className="fridge-card__header">
          <figure className="fridge-card__figure">
            <img className="fridge-card__image" src={item.image_url} alt="" style={item.image_url.includes('spoonacular') ? {'objectFit': 'contain'} : {'objectFit': 'cover'} }/>
          </figure>
          <div className={statusClassName}>{status()}</div>
        </div>
        <div className="fridge-card__footer">
          <h4 className="fridge-card__name">{item.name}</h4>
          <h5 className="fridge-card__date">
            <BsFillClockFill />
            <span>Added {moment(item.time_stored).fromNow()}</span>
          </h5>
        </div>
      </button>
      <Modal size='lg' show={show} onHide={handleClose}>
        <Modal.Header className='item-modal-header' closeButton>
        </Modal.Header>
        <Modal.Body>
          <FridgeItemIndex
            id={item.id}
            closeModal={handleClose}
          />
        </Modal.Body>
      </Modal>
    </article>
  )
}

export default FridgeCard;
