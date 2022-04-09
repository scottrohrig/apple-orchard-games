import '../item.css';
import icon from '../../../assets/images/juicer.png';
import { useState } from 'react';
import { formatTime, getTimeRemaining, useInterval } from '../../../utils/helpers';

const start = new Date();

const mock = {
  _id: 1,
  startedAtTime: start,
  duration: 6,
}

// pass in juicer props from parent page / component
const Juicer = (juicer) => {

  // deconstruct the juicer props passed in from parent
  const [{ _id, startedAtTime, duration }, setState] = useState(mock) // juicer

  const [timeRemaining, setTime] = useState(duration);
  const isReady = timeRemaining <= 0

  // custom Hook to handle intervals across item types
  useInterval(() => {
    if (timeRemaining <= 0) {
      return;
    }
    setTime(getTimeRemaining(startedAtTime, duration));
  }, 1000);

    const handleUseBtnPressed = (event) => {
      // dispatch update juicer with a new startedAtTime
      setState({_id, startedAtTime: new Date(), duration})

      console.log('dispatching startedAtTime', startedAtTime)

      setTime(duration);
    };

  return (
    <>
      <div className='item-container'>
        <div className='temp-img'>
          <img src={icon} alt="juicer" />
        </div>
        <div className='item-btn-wrapper'>

          <div className="item-btn-flex">
            {timeRemaining <= 0 ? (
              <button className="btn btn-harvest" onClick={() => { handleUseBtnPressed(); }}>use</button>
            ) : (
              <button className="btn btn-timer" disabled>{timeRemaining}s</button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Juicer;
