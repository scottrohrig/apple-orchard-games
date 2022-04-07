import React, { useState } from "react"; 

// example game state
const exampleGameState = {
  gameDollars: 2275,
  gems: 31,
  apples: 120,
  juices: 27,
  sauces: 10,
  pies: 6,
};

// example game variables - should be stored in separate file
const exampleGameVariables = {
  appleSaleRevenue: 1,
  juiceSaleRevenue: 4,
  sauceSaleRevenue: 8,
  pieSaleRevenue: 20,
  juicerCost: 10,
  masherCost: 30,
  ovenCost: 120,
  gemPurchaseCost: 0.99,
  gemsFromPurchase: 5,
};

export default function Marketplace() {

  // for input field in apples to sell form
  const [applesToSell, setApplesToSell] = useState("");

  // sell apples
  function handleSellApples(evt) {
    evt.preventDefault();

    // consider using buttons instead of input field for selling apples (buttons could relate to how many apples are in basket).  If we use an input field, we'll need to error-check and reject bad inputs which isn't fun for the user
    console.log(
      "Error check, then remove " +
        applesToSell +
        " apples from inventory, increase gameDollars by $" +
        applesToSell * exampleGameVariables.appleSaleRevenue +
        ", and deactivate this button if there are no apples left."
    );
  }

  // sell juice
  function handleSellJuice(evt) {
    evt.preventDefault();

    console.log(
      "remove " +
        exampleGameState.juices +
        " juices from inventory, increase gameDollars by $" +
        exampleGameState.juices * exampleGameVariables.juiceSaleRevenue +
        ", and deactivate this button."
    );
  }

  //sell sauce
  function handleSellSauce(evt) {
    evt.preventDefault();

    console.log(
      "remove " +
        exampleGameState.sauces +
        " juices from inventory, increase gameDollars by $" +
        exampleGameState.sauces * exampleGameVariables.sauceSaleRevenue +
        ", and deactivate this button."
    );
  }

  // sell pies
  function handleSellPies(evt) {
    evt.preventDefault();

    console.log(
      "remove " +
        exampleGameState.pies +
        "  pies from inventory, increase gameDollars by $" +
        exampleGameState.pies * exampleGameVariables.pieSaleRevenue +
        ", and deactivate this button."
    );
  }

  // buy juicer
  function handleBuyJuicer(evt) {
    evt.preventDefault();

    console.log(
      "add 1 juicer to inventory, reduce gameDollars by $" +
        exampleGameVariables.juicerCost +
        "."
    );
  }

  //buy masher
  function handleBuyMasher(evt) {
    evt.preventDefault();

    console.log(
      "add 1 masher to inventory, reduce gameDollars by $" +
        exampleGameVariables.masherCost +
        "."
    );
  }

  // buy oven
  function handleBuyOven(evt) {
    evt.preventDefault();

    console.log(
      "add 1 oven to inventory, reduce gameDollars by $" +
        exampleGameVariables.ovenCost +
        "."
    );
  }

  // buy gems
  function handleBuyGems(evt) {
    evt.preventDefault();

    console.log(
      "go to stripe, charge $" +
        exampleGameVariables.gemPurchaseCost +
        ". If sale is confirmed, add " +
        exampleGameVariables.gemsFromPurchase +
        " gems to the inventory."
    );
  }

  return (
    <>
      <h1>marketplace</h1>

      {/* recap of product to sell */}
      <h2>----- stuff to sell</h2>
      <h2>Wallet has ${exampleGameState.gameDollars}</h2>
      <h2>Gem stash has {exampleGameState.gems} gems</h2>
      <h2>Basket has {exampleGameState.apples} apples</h2>
      <h2>Basket has {exampleGameState.juices} juices</h2>
      <h2>Basket has {exampleGameState.sauces} sauces</h2>
      <h2>Basket has {exampleGameState.pies} pies</h2>

      {/* sell stuff */}
      <h2>----- sell stuff</h2>
      {/* form and buttons will need to check whether there is inventory for their product before activating */}
      <form onClick={handleSellApples}>
        <label>
          Enter number of apples you wish to sell.
          <input
            type="text"
            value={applesToSell}
            onChange={(evt) => setApplesToSell(evt.target.value)}
          ></input>
          <button>Sell Apples</button>
        </label>
      </form>

      <button onClick={handleSellJuice}>
        Sell all juices for $
        {exampleGameState.juices * exampleGameVariables.juiceSaleRevenue}
      </button>
      <button onClick={handleSellSauce}>
        Sell all sauces for $
        {exampleGameState.sauces * exampleGameVariables.sauceSaleRevenue}
      </button>
      <button onClick={handleSellPies}>
        Sell all pies for $
        {exampleGameState.pies * exampleGameVariables.pieSaleRevenue}
      </button>
      
      {/* buy stuff */}
      <h2>----- buy stuff</h2>
      <button onClick={handleBuyJuicer}>
        Buy Juicer for ${exampleGameVariables.juicerCost}
      </button>
      <button onClick={handleBuyMasher}>
        Buy Masher for ${exampleGameVariables.masherCost}
      </button>
      <button onClick={handleBuyOven}>
        Buy Oven for ${exampleGameVariables.ovenCost}
      </button>
      <button onClick={handleBuyGems}>
        Buy {exampleGameVariables.gemsFromPurchase} gems for $
        {exampleGameVariables.gemPurchaseCost} in real money.
      </button>
    </>
  );
}
