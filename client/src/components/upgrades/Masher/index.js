import '../item.css';
import icon from '../../../assets/images/masher.png';
import sauceImg from '../../../assets/images/sauce.png';
import { useState } from 'react';
import { formatTime, getTimeRemaining, useInterval } from '../../../utils/helpers';
import { UPDATE_MASHERS, SELL_SAUCE, APPLES_FOR_SAUCE } from '../../../utils/actions';


// pass in masher props from parent page / component
const Masher = ({ props }) => {

  const { masher, dispatch } = props
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
        { ...masher, startedAtTime: now, duration }
    }
    );

    dispatch({
      type: SELL_SAUCE
    })


    dispatch({
      type: APPLES_FOR_SAUCE
    });

    console.log('dispatching startedAtTime', startedAtTime)

    setTime(duration);
  };

  return (
    <>{isReady ?
      (
        <div className='item-container'>
          <div className='temp-img'>
            <img src={sauceImg} alt="juicer" />
          </div>
          <div className='item-btn-wrapper'>

            <div className="item-btn-flex">

              <button className="btn btn-harvest" onClick={() => { handleUseBtnPressed(); }}>sell</button>

            </div>
          </div>
        </div>
      )
      : (
        <div className='item-container'>
          <div className='temp-img'>
            <img src={icon} alt="juicer" />
          </div>
          <div className='item-btn-wrapper'>

            <div className="item-btn-flex">

              <button className="btn btn-timer" disabled>{timeRemaining}s</button>

            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Masher;
