import '../item.css';
import icon from '../../../assets/images/juicer.png';
import juiceImg from '../../../assets/images/juice.png';
import { useState } from 'react';
import { getTimeRemaining, useInterval } from '../../../utils/helpers';
import { UPDATE_JUICER, SELL_JUICE, APPLES_FOR_JUICE } from '../../../utils/actions';

// pass in juicer props from parent page / component
const Juicer = ({ props }) => {

  const { juicer, dispatch, updateJuicer } = props;

  // deconstruct the juicer props passed in from parent
  const { _id: juicerId, startedAtTime, duration } = juicer;

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

  const handleUseBtnPressed = async (event) => {

    // validate user appleCount > juicerAppleCost
    // dispatch update juicer with a new startedAtTime
    const now = new Date();

    console.log('sellJuiceBtn press', juicerId);

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

    const { data: jData } = await updateJuicer({
      variables: {
            juicerId: juicerId,
            startedAtTime: now,
            duration
          }
    });
    console.log('jData', jData);
    // console.log('UPDATED_USERS_JUICERS', jData.updateJuicer.juicers[0]._id, '\nJUICER_ID', juicerId);

    setTime(duration);
  };

  return (
    <>
      <div className='item-container'>
        {juicerId.slice(juicerId.length - 5)}
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
