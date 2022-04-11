import '../item.css';
import icon from '../../../assets/images/juicer.png';
import juiceImg from '../../../assets/images/juice.png';
import { useState } from 'react';
import { formatTime, getTimeRemaining, useInterval } from '../../../utils/helpers';
import { UPDATE_JUICERS } from '../../../utils/actions';


// pass in juicer props from parent page / component
const Juicer = ({ props }) => {

  const { juicer, dispatch } = props;
  // deconstruct the juicer props passed in from parent
  // const [{ _id, startedAtTime, duration }, setState] = useState(mock) // juicer

  const { _id, startedAtTime, duration } = juicer;

  // only thing I don't like is this duration displays on mount
  const [timeRemaining, setTime] = useState(duration);
  const isReady = timeRemaining <= 0;

  // custom Hook to handle intervals across item types
  useInterval(() => {
    if (isReady) {
      return;
    }
    setTime(getTimeRemaining(startedAtTime, duration));
  }, 1000);

  const handleUseBtnPressed = (event) => {

    // validate user appleCount > juicerAppleCost

    // dispatch update juicer with a new startedAtTime
    // setState({_id, startedAtTime: new Date(), duration})
    const now = new Date();
    console.log('new time', now);
    dispatch({
      type: UPDATE_JUICERS,
      payload:
        { ...juicer, startedAtTime: now, duration }
    }
    );

    console.log('dispatching startedAtTime', startedAtTime);

    setTime(duration);
  };

  return (
    <>{isReady ?
      (
        <div className='item-container'>
          <div className='temp-img'>
            <img src={juiceImg} alt="juicer" />
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

export default Juicer;
