import { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import icon from "../../../assets/images/oven.png";
import pieImg from "../../../assets/images/pie.png";

import { getTimeRemaining, useInterval } from "../../../utils/helpers";
import { UPDATE_USER } from "../../../utils/mutations";

// pass in oven props from parent page / component
const Oven = ({
  oven,
  appleCount,
  money,
  useIsMount,
  handleOvenSellBtnPressed,
}) => {
  const [updateUser] = useMutation(UPDATE_USER);

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
  // useEffect(async () => {
  //   if (!isMount) {
  //     const { data: uData } = await updateUser({
  //       variables: { money: money, appleCount },
  //     });
  //     console.log('uData', uData);
  //   }
  // }, [success]);

  const handleUseBtnPressed = (event) => {
    handleOvenSellBtnPressed(oven);

    setTime(duration);
    setSuccess(!success);
  };

  return (
    <>
      <div className="item-container">
        <div className="temp-img">
          {isReady ? (
            <img src={pieImg} alt="oven" />
          ) : (
            <img src={icon} alt="oven" />
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

export default Oven;
