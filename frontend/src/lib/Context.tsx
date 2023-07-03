import React, { PropsWithChildren, useEffect, useState } from "react";
import { io } from "socket.io-client";

// Config
import { host, port } from "./config";

// Data type stored in this context
// Data will be initially null
export type Data = Array<Company> | null;

// We use this token to uniquely identify each request
const token = Math.random() * 3711;

// The view that is passed to the server
const view: View = "home";

// The view options passed to the server
const view_options: ViewOptions = {
  type: "historical",
};

// The context
const ctx = React.createContext<Data>(null);
export default ctx;

// The provider
export function StocksProvider(props: PropsWithChildren) {
  // Data is initially null
  const [data, setData] = useState<Data>(null);

  // When the component mounts
  useEffect(() => {
    // Connect to the server
    const socket = io(`${host}:${port}`);
    socket.on("res", (token: string, data: Data) => {
      // console.log(data[0].options[0].call.length);
      // console.log(data[0].options[0].id);
      if (token == token) setData(data);
    });
    socket.emit("req", token, view, view_options);
  }, []);

  return <ctx.Provider value={data}>{props.children}</ctx.Provider>;
}

// The consumer
export let StocksConsumer = ctx.Consumer;
