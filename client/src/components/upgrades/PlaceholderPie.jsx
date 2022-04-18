import buyIcon from "../../assets/images/empty_pie.png";

export default function BuyOven({ handlePurchase }) {
  return (
    <div className="item-container">
      <div className="temp-img">
        <img src={buyIcon} alt="buy upgrade" className="no-upgrade" />
      </div>
      <div className="item-btn-wrapper">
        <div className="item-btn-flex">
          <button className="btn btn-shop" onClick={handlePurchase}>
            buy
          </button>
        </div>
      </div>
    </div>
  );
}
