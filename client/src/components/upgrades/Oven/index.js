import '../item.css';
import icon from '../../../assets/images/oven.png';
import pieImg from '../../../assets/images/pie.png';
import { useState } from 'react';
import { formatTime, getTimeRemaining, useInterval } from '../../../utils/helpers';
import { UPDATE_OVENS, SELL_PIE, APPLES_FOR_PIE } from '../../../utils/actions';


// pass in oven props from parent page / component
const Oven = ({ props }) => {

  const { oven, dispatch } = props
  // deconstruct the oven props passed in from parent
  // const [{ _id, startedAtTime, duration }, setState] = useState(mock) // oven

  const { _id, startedAtTime, duration } = oven;

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
    // dispatch update oven with a new startedAtTime
    // setState({_id, startedAtTime: new Date(), duration})
    const now = new Date()
    console.log('new time', now)
    dispatch({
      type: UPDATE_OVENS,
      payload:
        { ...oven, startedAtTime: now, duration }
    }
    );

    dispatch({
      type: SELL_PIE
    })


    dispatch({
      type: APPLES_FOR_PIE
    });

    console.log('dispatching startedAtTime', startedAtTime)

    setTime(duration);
  };

  return (
    <>{isReady ?
      (
        <div className='item-container'>
          <div className='temp-img'>
            <img src={pieImg} alt="juicer" />
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

export default Oven;
