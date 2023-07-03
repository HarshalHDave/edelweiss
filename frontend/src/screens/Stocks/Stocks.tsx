// @ts-nocheck
import React from "react";
import { Link } from "react-router-dom";

const Stocks = () => {
  return (
    <div>
      <h2>Stocks</h2>
      <ul>
        <li>
          <Link to="/stocks/1">Nifty</Link>
        </li>
        <li>
          <Link to="/stocks/2">Stock 2</Link>
        </li>
        <li>
          <Link to="/stocks/3">Stock 3</Link>
        </li>
      </ul>
    </div>
  );
};



export default Stocks;
