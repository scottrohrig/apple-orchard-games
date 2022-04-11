import buyIcon from '../../assets/images/empty_juice.png'

export default function BuyJuicer({handlePurchase}) {

  return (
    <div className="item-container">
      <div className="temp-img"><img src={buyIcon} alt="buy upgrade" /></div>
      <div className="item-btn-wrapper">
        <div className="item-btn-flex"><button className="btn btn-shop" onClick={handlePurchase}>buy</button></div>
      </div>
    </div>
  )
}
