import React, { useContext } from "react";
import stockCtx from "../lib/stocks";

const Home = () => {
  const cont = useContext(stockCtx);
  return (
    <div>
      <table>
        <th>
          <td>{cont && cont[0].name}</td>
          <td>{cont && cont[1].name}</td>
          <td>{cont && cont[2].name}</td>
          <td>{cont && cont[3].name}</td>
        </th>
        
      </table>
    </div>
  );
};

export default Home;
