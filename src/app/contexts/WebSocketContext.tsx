import { createContext } from "react"
import { io, Socket } from "socket.io-client"

export const socket = io("http://[::1]:4000")

export const WebSocketContext = createContext<Socket>(socket)

export default WebSocketContext
