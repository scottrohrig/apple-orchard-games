import '../item.css';
import icon from '../../../assets/images/oven.png';
import pieImg from '../../../assets/images/pie.png';
import { useState } from 'react';
import { formatTime, getTimeRemaining, useInterval } from '../../../utils/helpers';
import { UPDATE_OVENS } from '../../../utils/actions';


// pass in oven props from parent page / component
const Oven = ({props}) => {

  const {oven, dispatch} = props
  // deconstruct the oven props passed in from parent
  // const [{ _id, startedAtTime, duration }, setState] = useState(mock) // oven

  const { _id, startedAtTime, duration } = oven

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
        {...oven, startedAtTime: now, duration}}
        )

      console.log('dispatching startedAtTime', startedAtTime)

      setTime(duration);
    };

  return (
    <>
      <div className='item-container'>
        <div className='temp-img'>
            {isReady ? (
          <img src={pieImg} alt="oven" />
              ) : (
              <img src={icon} alt="oven" />
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

export default Oven;
