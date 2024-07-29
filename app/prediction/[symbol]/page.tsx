"use client";

import { ChangeEvent, useState } from 'react';

interface PageProps {
    params: {
        symbol: string;
    }
}

const Page = ({params}: PageProps) => {
  const [prediction, setPrediction] = useState(null);
  const [stockData, setStockData] = useState({
    Open: 0,
    High: 0,
    Low: 0,
    Close: 0,
    Volume: 0
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setStockData({
      ...stockData,
      [name]: parseFloat(value)
    });
  };

  const predict = async () => {
    const response = await fetch('/api/predict/' + params.symbol, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(stockData)
    });
    const data = await response.json();
    setPrediction(data.prediction);
  };

  return (
    <div>
      <h1>Stock Predictor</h1>
      <input type="number" name="Open" placeholder="Open" onChange={handleChange} />
      <input type="number" name="High" placeholder="High" onChange={handleChange} />
      <input type="number" name="Low" placeholder="Low" onChange={handleChange} />
      <input type="number" name="Close" placeholder="Close" onChange={handleChange} />
      <input type="number" name="Volume" placeholder="Volume" onChange={handleChange} />
      <button onClick={predict}>Predict</button>
      {prediction !== null && <p>Predicted Return: {prediction}</p>}
    </div>
  );
}

export default Page;
