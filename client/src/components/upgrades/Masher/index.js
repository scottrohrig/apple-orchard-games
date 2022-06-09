import { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import icon from "../../../assets/images/masher.png";
import sauceImg from "../../../assets/images/sauce.png";

import { getTimeRemaining, useInterval } from "../../../utils/helpers";
import { UPDATE_USER } from "../../../utils/mutations";

// pass in masher props from parent page / component
const Masher = ({
  masher,
  appleCount,
  money,
  useIsMount,
  handleMasherSellBtnPressed,
}) => {
  const [updateUser] = useMutation(UPDATE_USER);

  const { _id: masherId, startedAtTime, duration } = masher;

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
  // useEffect(async () => {
  //   if (!isMount) {
  //     const { data: uData } = await updateUser({
  //       variables: { money: money, appleCount },
  //     });
  //     console.log('uData', uData);
  //   }
  // }, [success]);

  const handleUseBtnPressed = (event) => {
    handleMasherSellBtnPressed(masher);

    setTime(duration);
    setSuccess(!success);
  };

  return (
    <>
      <div className="item-container">
        <div className="temp-img">
          {isReady ? (
            <img src={sauceImg} alt="juicer" />
          ) : (
            <img src={icon} alt="juicer" />
          )}
        </div>

        <div className="item-btn-wrapper">
          <div className="item-btn-flex">
            {isReady ? (
              <button
                className="btn btn-harvest"
                onClick={() => {
                  handleUseBtnPressed();
                }}
              >
                sell
              </button>
            ) : (
              <button className="btn btn-timer" disabled>
                {timeRemaining ? timeRemaining : duration}s
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Masher;
