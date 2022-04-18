import buyIcon from "../../assets/images/empty_juice.png";

export default function BuyJuicer({ handleUpgradePurchased }) {
  return (
    <div className="item-box">

      <div className="item-container">
        <div className="temp-img">
          <img src={buyIcon} alt="buy upgrade" className="no-upgrade" />
        </div>
        <div className="item-btn-wrapper">
          <div className="item-btn-flex">
            <button className="btn btn-shop" onClick={handleUpgradePurchased}>
              buy
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
