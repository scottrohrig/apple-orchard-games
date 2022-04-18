import '../item.css';
import { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import icon from '../../../assets/images/oven.png';
import pieImg from '../../../assets/images/pie.png';

import { getTimeRemaining, useInterval } from '../../../utils/helpers';
import { UPDATE_OVEN, SELL_PIE, APPLES_FOR_PIE } from '../../../utils/actions';
import { UPDATE_USER } from '../../../utils/mutations';

// pass in juicer props from parent page / component
const Oven = ({ props }) => {

  const { oven, dispatch, updateOven, appleCount, makePieApplesUsed, useIsMount, money } = props;

  const [updateUser, { error }] = useMutation(UPDATE_USER);

  // deconstruct the juicer props passed in from parent
  const { _id: ovenId, startedAtTime, duration } = oven;

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
  useEffect(() => {
    if (!isMount) {
      updateUser({
        variables: { money: money, appleCount },
      });
    }
  }, [success]);

  const handleUseBtnPressed = (event) => {

    // validate user appleCount > ovenAppleCost
    if (appleCount < makePieApplesUsed) {
      return
    }
    // dispatch update oven with a new startedAtTime
    const now = new Date();

    // console.log('sellPieBtn press', ovenId);

    dispatch({
      type: UPDATE_OVEN,
      payload:
        { _id: ovenId, startedAtTime: now, duration }
    });

    dispatch({
      type: SELL_PIE
    });

    dispatch({
      type: APPLES_FOR_PIE
    });

    updateOven({
      variables: {
        ovenId: ovenId,
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
            ? <img src={pieImg} alt="oven" />
            : <img src={icon} alt="oven" />}
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

export default Oven;
