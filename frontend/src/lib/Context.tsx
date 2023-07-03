import React, { PropsWithChildren, useEffect, useState } from "react";
import { io } from "socket.io-client";

// Config
import { host, port } from "./config";

// We use this token to uniquely identify each request
const my_token = `${Math.random() * 3711}`;

// The view that is passed to the server
const view: View = "home";

// The view options passed to the server
const view_options: ViewOptions = {
	type: "historical",
};

// The context
const ctx = React.createContext<Company[]>([]);
export default ctx;

let call_len = -1;
let put_len = -1;

// The provider
export function StocksProvider(props: PropsWithChildren) {
	// Data is initially null
	const [data, setData] = useState<Company[]>([]);

	// When the component mounts
	useEffect(() => {
		// Connect to the server
		const socket = io(`${host}:${port}`);
		socket.on("res", (token: string, data: Company[]) => {
			const target_cmp = data.find((d) => d.name == "MAINIDX");
			if (target_cmp) {
				const target_opt = target_cmp.options.find(
					(o) => o.id == "MAINIDX27JUL2317000"
				);
				if (target_opt) {
					if (target_opt.call.length != call_len) {
						call_len += target_opt.call.length;
						console.log("Length of call: ", target_opt.call.length);
						console.log("Call: ", target_opt.call);
					}
					if (target_opt.call.length != put_len) {
						put_len += target_opt.put.length;
						console.log("Length of put: ", target_opt.put.length);
						console.log("Put: ", target_opt.put);
					}
				}
			}

			if (token == my_token) setData(data);
		});
		socket.emit("req", my_token, view, view_options);
	}, []);

	return <ctx.Provider value={data}>{props.children}</ctx.Provider>;
}

// The consumer
export let StocksConsumer = ctx.Consumer;
