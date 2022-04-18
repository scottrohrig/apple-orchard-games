import '../item.css';
import { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import icon from '../../../assets/images/masher.png';
import sauceImg from '../../../assets/images/sauce.png';

import { getTimeRemaining, useInterval } from '../../../utils/helpers';
import { UPDATE_MASHER, SELL_SAUCE, APPLES_FOR_SAUCE } from '../../../utils/actions';
import { UPDATE_USER } from '../../../utils/mutations';

// pass in masher props from parent page / component
const Masher = ({ props }) => {

  const { masher, dispatch, updateMasher, appleCount, makeSauceApplesUsed, useIsMount, money } = props;

  const [updateUser, { error }] = useMutation(UPDATE_USER);

  // deconstruct the masher props passed in from parent
  const { _id: masherId, startedAtTime, duration } = masher;


  const [timeRemaining, setTime] = useState(duration);
  const isReady = timeRemaining <= 0

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

    // validate user appleCount > masherAppleCost
    if (appleCount < makeSauceApplesUsed) {
      return
    }
    // dispatch update juicer with a new startedAtTime
    const now = new Date();

    // console.log('new time', now)

    dispatch({
      type: UPDATE_MASHER,
      payload:
        { _id: masherId, startedAtTime: now, duration }
    });

    dispatch({
      type: SELL_SAUCE
    });

    dispatch({
      type: APPLES_FOR_SAUCE
    });

    updateMasher({
      variables: {
        masherId: masherId,
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
            ? <img src={sauceImg} alt="masher" />
            : <img src={icon} alt="masher" />}
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

export default Masher;
