// @ts-nocheck
import React from "react";
import { useParams } from "react-router-dom";

const Stocks = () => {
  return (
    <div>
      <h2>Stocks</h2>
      <ul>
        <li>
          <a href="/stocks/1">Stock 1</a>
        </li>
        <li>
          <a href="/stocks/2">Stock 2</a>
        </li>
        <li>
          <a href="/stocks/3">Stock 3</a>
        </li>
      </ul>
    </div>
  );
};

const StockDetails = () => {
  const { id } = useParams();

  return (
    <div>
      <h2>Stock Details</h2>
      <p>Stock ID: {id}</p>
    </div>
  );
};

export { Stocks, StockDetails };
