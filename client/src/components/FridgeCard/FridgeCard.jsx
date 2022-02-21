import CheckBox from '../Checkbox/Checkbox';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { BsFillClockFill } from 'react-icons/bs';
import moment from 'moment';

function FridgeCard(props) {
  const { item, checkboxVisible, onChecked } = props;
  const daysUntilExpired = moment(item.expiry).endOf('day').diff(moment().endOf('day'), 'days');

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
      <Link to={`/fridge-items/${item.id}`} >
        <div className="fridge-card__header" style={{backgroundImage: `url(${item.image_url})`}}>
          <div className={statusClassName}>{status()}</div>
        </div>
        <div className="fridge-card__footer">
          <h4 className="fridge-card__name">{item.name}</h4>
          <h5 className="fridge-card__date">
            <BsFillClockFill />
            <span>Added {moment(item.date_stored).fromNow()}</span>
          </h5>
        </div>
      </Link>
    </article>
  )
}

export default FridgeCard;
