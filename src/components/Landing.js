import React, { useState, useEffect } from "react";

// api
import { getCoin } from "../services/api";

// loading
import Loading from "./Loading";

// Comment
import Coin from "./Coin";

// css
import styles from "./Landing.module.css";

const Landing = () => {
  const [coins, setCoins] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    const fetchApi = async () => {
      const data = await getCoin();
      setCoins(data);
    };
    fetchApi();
  }, []);

  const changeHandler = (e) => {
    setText(e.target.value);
  };

  const filterCoin = text.trim()
    ? coins.filter((coin) =>
        coin.name.toLowerCase().includes(text.toLowerCase())
      )
    : coins;

  return (
    <>
      <input
        className={styles.input}
        onChange={changeHandler}
        type="text"
        placeholder="Search coin"
        value={text}
      />
      <div className={styles.coinContainer}>
        {coins.length > 0 ? (
          !filterCoin.length ? (
            <h2>there isn't any coin that match with this name</h2>
          ) : (
            filterCoin.map((coin) => (
              <Coin
                key={coin.id}
                name={coin.name}
                image={coin.image}
                symbol={coin.symbol}
                price={coin.current_price}
                marketCap={coin.market_cap}
                priceChange={coin.price_change_percentage_24h}
              ></Coin>
            ))
          )
        ) : (
          Loading()
        )}
      </div>
    </>
  );
};

export default Landing;
