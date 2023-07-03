import { io } from "socket.io-client";
import { host, port } from "../config";

import { useEffect, useState } from "react";

export type ChangeFunction = (view: View) => void;

export interface ContextData<T> {
	data: T | Err | null;
	changeView: ChangeFunction;
}

function useStream<T = any>(
	initialView: View
): [T | null, Err | null, ChangeFunction] {
	const token = `stream_${Math.random() * 1000}`;
	const socket = io(`${host}:${port}`);

	const [data, setData] = useState<T | null>(null);
	const [err, setErr] = useState<Err | null>(null);

	useEffect(() => {
		socket.on("res", (token: string, data: T | null, err: Err | null) => {
			if (token == token) {
				setData(data);
				setErr(err);
			}
		});

		socket.emit("req", token, initialView);
	}, []);

	const changeView: ChangeFunction = (view) => {
		socket.emit("req", token, view);
	};

	return [data, err, changeView];
}

export default useStream;
