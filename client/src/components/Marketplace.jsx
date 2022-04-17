import { useCallback, useEffect, useState } from "react";
import { APPLES_FOR_MONEY } from "../utils/actions";
import { useGlobalContext } from "../utils/GlobalState";
import "./shop.css";

import apple from "../assets/images/apple.svg";
import gem from "../assets/images/gem.svg";
import { useQuery, useMutation } from "@apollo/client";
import { UPDATE_USER } from "../utils/mutations";
import { QUERY_ME } from "../utils/queries";

import { useIsMount } from "../utils/helpers";

export default function Marketplace({ showMarketplace, setShowMarketplace }) {
  const isMount = useIsMount();
  const [state, dispatch] = useGlobalContext();
  const { appleCount, gameVariables } = state;

  const [updateUser, { error }] = useMutation(UPDATE_USER);

  // for input field in apples to sell form
  const [applesToSell, setApplesToSell] = useState(0);
  const [success, setSuccess] = useState(false);

  // sell apples
  function handleSellApples(event) {
    if (applesToSell > appleCount || appleCount < 0) {
      return;
    }

    setApplesToSell(0);

    const payload = Math.max(applesToSell, 0);
    try {
      console.log("Update AppleCount Payload:", payload);
      dispatch({
        type: APPLES_FOR_MONEY,
        payload,
      });
      setSuccess(!success);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(async () => {
    if (!isMount) {
      // doesn't occur on page load
      // if (!loading) {
      // SERVER-SIDE update the user's money and appleCount
      const { data } = await updateUser({
        variables: { money: state.money, appleCount },
      });
      console.log("SERVER updateUser called:", data.updateUser);
      // }
    }
  }, [success]);

  // buy gems
  function handleBuyGems(event) {
    console.log("TODO: handleBuyingGems");
  }

  return (
    <div>
      <div
        className={`modal-background ${
          showMarketplace && "modal-background-active"
        }`}
        onClick={() => {
          if (showMarketplace) {
            setShowMarketplace(!showMarketplace);
          }
        }}
      ></div>
      <div
        className={`leaderboard shop modal ${
          showMarketplace && "modal-active"
        }`}
      >
        <button
          className="btn btn-modal"
          onClick={() => setShowMarketplace(!showMarketplace)}
        >
          <i className="fa-solid fa-xmark"></i>
        </button>

        <h2 className="page-title">
          <p className="display-banner">Farmers Marketplace</p>
        </h2>
        <h3 className="sub-title">Buy Upgrades & Gems</h3>

        <div>
          {/* SELL APPLES FOR CURRENCY */}
          <div className="item-label">Sell Apples</div>
          <div className="sell-apples">
            <div className="apple-increment">
              <span
                className="increment-btn by-25 decrement"
                onClick={() => setApplesToSell(Math.max(applesToSell - 25, 0))}
              >
                <i className="fa-solid fa-angles-left"></i>
              </span>
              <span
                className="increment-btn by-5 decrement"
                onClick={() => setApplesToSell(Math.max(applesToSell - 5, 0))}
              >
                <i className="fa-solid fa-minus"></i>
              </span>
              <span className="apple-count">
                <img src={apple} alt="apple" />
              </span>
              <span
                className="increment-btn by-5 increment"
                onClick={() =>
                  setApplesToSell(Math.min(applesToSell + 5, appleCount))
                }
              >
                <i className="fa-solid fa-plus"></i>
              </span>
              <span
                className="increment-btn by-25 increment"
                onClick={() =>
                  setApplesToSell(Math.min(applesToSell + 25, appleCount))
                }
              >
                <i className="fa-solid fa-angles-right"></i>
              </span>
            </div>

            <p>
              <button
                className="btn btn-timer"
                onClick={() => {
                  handleSellApples();
                }}
              >
                Sell <span className="apple-amount">{applesToSell}</span>{" "}
                Apples!
              </button>
            </p>
          </div>

          {/* $USD PURCHASES FOR GEMS */}
          <div className="item-label">Buy Gems</div>
          <div className="shop-item-row">
            <div className="shop-box">
              <div className="card usd">
                <div className="shop-card">
                  <div className="shop-img">
                    <img src={gem} alt="gem" className="buy-gem" />
                  </div>
                  <div className="shop-buy-label">
                    <div className="card-label usd-label">5 gem deal</div>
                    <p>buy 5 gems for $5</p>
                    <button
                      className="btn btn-buy"
                      onClick={() => {
                        handleBuyGems();
                      }}
                    >
                      Buy
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="shop-box">
              <div className="card usd">
                <div className="shop-card">
                  <div className="shop-img">
                    <img src={gem} alt="gem" className="many-gem-1" />
                    <img src={gem} alt="gem" className="many-gem-2" />
                  </div>
                  <div className="shop-buy-label">
                    <div className="card-label usd-label">25 gem deal</div>
                    <p>buy 25 gems for $20</p>
                    <button className="btn btn-buy">Buy</button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="item-label">Purchase Upgrades!</div>
          <div className="shop-item-row">
            <div className="shop-box">
              <div className="card">
                <div className="shop-card">
                  <div className="shop-img">
                    <i className="fa-solid fa-stopwatch"></i>
                  </div>
                  <div className="shop-buy-label">
                    <div className="card-label">Harvest Now</div>
                    <p>Coming soon!</p>
                    <button className="btn btn-shop" disabled>
                      Buy
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="shop-box">
              <div className="card">
                <div className="shop-card">
                  <div className="shop-img">
                    <i className="fa-solid fa-rotate"></i>
                  </div>
                  <div className="shop-buy-label">
                    <div className="card-label">Auto Harvest</div>
                    <p>Coming soon!</p>
                    <button className="btn btn-shop" disabled>
                      Buy
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="coming-soon-shop">
            Coming soon!
          </div>
        </div>
      </div>
    </div>
  );
}
