import '../item.css';
import { useState, useEffect } from 'react';
import icon from '../../../assets/images/juicer.png';
import juiceImg from '../../../assets/images/juice.png';
import { getTimeRemaining, useInterval } from '../../../utils/helpers';
import { UPDATE_JUICER, SELL_JUICE, APPLES_FOR_JUICE } from '../../../utils/actions';

// pass in juicer props from parent page / component
const Juicer = ({ props }) => {

  const { juicer, dispatch, updateJuicer, appleCount, makeJuiceApplesUsed, useIsMount, updateUser, money } = props;

  // deconstruct the juicer props passed in from parent
  const { _id: juicerId, startedAtTime, duration } = juicer;

  // only thing I don't like is this duration displays on mount
  const [timeRemaining, setTime] = useState(duration);
  let isReady = timeRemaining <= 0;

  // custom Hook to handle intervals across item types
  useInterval(() => {
    if (isReady) {
      return;
    }
    setTime(getTimeRemaining(startedAtTime, duration));
  }, 1000);

  // To update the user
  const isMount = useIsMount();
  const [success, setSuccess] = useState(false);
  useEffect( () => {
    if (!isMount) {
      updateUser({
        variables: { money: money, appleCount },
      });
    }
  }, [success]);

  const handleUseBtnPressed = (event) => {

    // validate user appleCount > juicerAppleCost
    if (appleCount < makeJuiceApplesUsed) {
      return
    }
    // dispatch update juicer with a new startedAtTime
    const now = new Date();

    // console.log('sellJuiceBtn press', juicerId);

    dispatch({
      type: UPDATE_JUICER,
      payload:
        { _id: juicerId, startedAtTime: now, duration }
    });

    dispatch({
      type: SELL_JUICE
    });

    dispatch({
      type: APPLES_FOR_JUICE
    });

    updateJuicer({
      variables: {
            juicerId: juicerId,
            startedAtTime: now,
            duration
          }
    });

    setTime(duration);
    setSuccess(!success);
  };

  return (
    <>
      <div className='item-container'>
        <div className='temp-img'>
          {isReady
            ? <img src={juiceImg} alt="juicer" />
            : <img src={icon} alt="juicer" />}
        </div>

        <div className='item-btn-wrapper'>
          <div className="item-btn-flex">
            {isReady
              ? <button
                className="btn btn-harvest"
                onClick={() => {
                  handleUseBtnPressed();
                }}>
                sell
              </button>
              : <button className="btn btn-timer" disabled>{timeRemaining}s</button>}
          </div>
        </div>
      </div>
    </>
  );
};

export default Juicer;
