"use client";

import { useEffect, useState } from 'react';

const Home = () => {
  const [stockData, setStockData] = useState(null);

  useEffect(() => {
    fetch('/api/stock/AAPL')
      .then((response) => response.json())
      .then((data) => setStockData(data));
  }, []);

  return (
    <div>
      <h1>Stock Predictor</h1>
      {stockData ? (
        <div>
          <p>Symbol: {stockData.symbol}</p>
          <p>Price: ${stockData.price}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default Home;
