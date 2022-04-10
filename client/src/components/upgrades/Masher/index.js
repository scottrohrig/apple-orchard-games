import '../item.css';
import icon from '../../../assets/images/masher.png';
import sauceImg from '../../../assets/images/sauce.png';
import { useState } from 'react';
import { formatTime, getTimeRemaining, useInterval } from '../../../utils/helpers';
import { UPDATE_MASHERS } from '../../../utils/actions';


// pass in masher props from parent page / component
const Masher = ({props}) => {

  const {masher, dispatch} = props
  // deconstruct the masher props passed in from parent
  // const [{ _id, startedAtTime, duration }, setState] = useState(mock) // masher

  const { _id, startedAtTime, duration } = masher

  const [timeRemaining, setTime] = useState(duration);
  const isReady = timeRemaining <= 0

  // custom Hook to handle intervals across item types
  useInterval(() => {
    if (isReady) {
      return;
    }
    setTime(getTimeRemaining(startedAtTime, duration));
  }, 1000);

    const handleUseBtnPressed = (event) => {
      // dispatch update masher with a new startedAtTime
      // setState({_id, startedAtTime: new Date(), duration})
      const now = new Date()
      console.log('new time', now)
      dispatch({
        type: UPDATE_MASHERS,
        payload:
        {...masher, startedAtTime: now, duration}}
        )

      console.log('dispatching startedAtTime', startedAtTime)

      setTime(duration);
      // TODO: - [ ] sell juice functionality - adds money to user
    };

  return (
    <>
      <div className='item-container'>
        <div className='temp-img'>
            {isReady ? (
          <img src={sauceImg} alt="masher" />
          ) : (
              <img src={icon} alt="masher" />
            )}
        </div>
        <div className='item-btn-wrapper'>

          <div className="item-btn-flex">
            {isReady ? (
              <button className="btn btn-harvest" onClick={() => { handleUseBtnPressed(); }}>sell</button>
            ) : (
              <button className="btn btn-timer" disabled>{timeRemaining}s</button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Masher;
