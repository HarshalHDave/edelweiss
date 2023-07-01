import React, { PropsWithChildren, useEffect, useState } from 'react'
import { io } from 'socket.io-client'

// Config
import { host, port } from './config'

// Data type stored in this context
// Data will be initially null
type Data = Array<SpotStock> | null

// An event name emitted by our socket io server
// The context will bind a listener to this name
const event_name = 'spot_stocks'

// The context
const ctx = React.createContext<Data>(null)
export default ctx

// The provider
export function SpotStocksProvider(props: PropsWithChildren) {
	// Data is initially null
	const [data, setData] = useState<Data>(null)

	// When the component mounts
	useEffect(() => {
		// Connect to the server
		const socket = io(`${host}:${port}`)
		// Start listening to the socket io server for the 'event_name'
		socket.on(event_name, (data: Data) => setData(data))
	}, [])

	return <ctx.Provider value={data}>{props.children}</ctx.Provider>
}

// The consumer
export let SpotStocksConsumer = ctx.Consumer
