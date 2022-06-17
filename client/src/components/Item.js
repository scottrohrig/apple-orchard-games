import { useState, useEffect } from "react";
// import { useMutation } from "@apollo/client";
import iconSell from "../assets/images/item-sell.png";
import iconMake from "../assets/images/item-make.png";

import { getTimeRemaining, useInterval } from "../utils/helpers";
// import { UPDATE_USER } from "../../../utils/mutations";

// pass in juicer props from parent page / component
export default function Item({
  juicer,
  // appleCount,
  // money,
  // useIsMount,
  handleJuicerSellBtnPressed,
}) {
  // const [updateUser, { error }] = useMutation(UPDATE_USER);

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
  console.log("inside juicer index");
  // const isMount = useIsMount();
  const [success, setSuccess] = useState(false);
  // useEffect(() => {
  //   if (!isMount) {
  //     updateUser({
  //       variables: { money: money, appleCount },
  //     });
  //   }
  // }, [success]);

  const handleUseBtnPressed = (event) => {
    handleJuicerSellBtnPressed(juicer);

    setTime(duration);
    setSuccess(!success);
  };

  return (
    <>
      <div className="item-container">
        <div className="temp-img">
          {isReady ? (
            <img src={iconSell} alt="juicer" />
          ) : (
            <img src={iconMake} alt="juicer" />
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
}
