import React, { PropsWithChildren } from "react";
import useStream, { type ChangeFunction } from "../lib/useStream";

type InputData = Array<
	Company & {
		market_data: Array<MarketData>;
		options: Array<
			Option & {
				market_data: Array<MarketData>;
			}
		>;
	}
>;

type OutputData = Array<
	Company & {
		market_data: Array<MarketData>;
		options: Array<
			OptionOnly & {
				call: Array<MarketData>;
				put: Array<MarketData>;
			}
		>;
		futures: Array<
			FutureOnly & {
				market_data: Array<MarketData>;
			}
		>;
	}
>;

interface ContextData {
	data: OutputData | null;
	err: Err | null;
	changeView: ChangeFunction;
}

const ctx = React.createContext<ContextData>({} as any);
export default ctx;

export function TableProvider(props: PropsWithChildren) {
	const [stream, err, changeView] = useStream<InputData>({
		resource: "company",
		include: ["market_data", "options", "options.market_data"],
	});

	let data: OutputData | null = null;

	if (stream == null) data = stream;
	else {
		data = stream.map((company) => {
			const new_options: Array<
				OptionOnly & {
					call: Array<MarketData>;
					put: Array<MarketData>;
				}
			> = [];

			const futures: Array<
				FutureOnly & {
					market_data: Array<MarketData>;
				}
			> = [];

			company.options.forEach((option) => {
				const trading_symbol = option.trading_symbol.substring(
					0,
					option.trading_symbol.length - 2
				);

				if (option.type == "fut") {
					let existing_opt = futures.findIndex(
						(f) => f.trading_symbol == trading_symbol
					);
					if (existing_opt == -1) {
						existing_opt = futures.length;
						futures.push({
							trading_symbol: option.trading_symbol,
							strike: option.strike,
							expiry_date: option.expiry_date,
							market_data: [],
						});
					}
					futures[existing_opt].market_data = option.market_data;
				}

				let existing_opt = new_options.findIndex(
					(o) => o.trading_symbol == trading_symbol
				);

				if (existing_opt == -1) {
					existing_opt = new_options.length;
					new_options.push({
						trading_symbol: option.trading_symbol,
						strike: option.strike,
						expiry_date: option.expiry_date,
						call: [],
						put: [],
					});
				}
				if (option.type == "cal")
					new_options[existing_opt].call = option.market_data;
				if (option.type == "put")
					new_options[existing_opt].put = option.market_data;
			});

			return {
				name: company.name,
				market_data: company.market_data,
				options: new_options,
				futures: futures,
			};
		});
	}

	return (
		<ctx.Provider
			value={{
				data,
				err,
				changeView,
			}}
		>
			{props.children}
		</ctx.Provider>
	);
}

export let TableConsumer = ctx.Consumer;