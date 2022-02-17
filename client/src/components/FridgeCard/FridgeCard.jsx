import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { BsFillClockFill } from 'react-icons/bs';
import moment from 'moment';

function FridgeCard(props) {
  const daysUntilExpired = moment(props.item.expiry).endOf('day').diff(moment().endOf('day'), 'days');

  const status = (daysLeft) => {
    if (daysUntilExpired > 3) {
      return 'Fresh';
    } else if (daysUntilExpired <= 3 && daysUntilExpired > 0) {
      return 'Expiring Soon';
    } else if (daysUntilExpired <= 0){
      return 'Expired';
    } else {
    return 'Fresh';
    }
  }

  const statusClassName = classNames('fridge-card__status', {
    'fridge-card__status--fresh': status(daysUntilExpired) === 'Fresh',
    'fridge-card__status--expiring': status(daysUntilExpired) === 'Expiring Soon',
    'fridge-card__status--expired': status(daysUntilExpired) === 'Expired',
  })

  return (
    <article className="fridge-card">
      <Link to={`/fridge-items/${props.item.id}`}>
        <div className="fridge-card__header">
          <img src={props.item.image_url} alt={props.item.name} className="fridge-card__image"/>
          <div className={statusClassName}>{status(daysUntilExpired)}</div>
        </div>
        <div className="fridge-card__footer">
          <h4 className="fridge-card__name">{props.item.name}</h4>
          <h5 className="fridge-card__date">
            days until expired {daysUntilExpired}
            Category: {props.item.category}
          </h5>
          <h5 className="fridge-card__date">
            <BsFillClockFill />
            <span>Added {moment(props.item.date_stored).fromNow()}</span>
          </h5>
        </div>
      </Link>
    </article>
  )
}

export default FridgeCard;
