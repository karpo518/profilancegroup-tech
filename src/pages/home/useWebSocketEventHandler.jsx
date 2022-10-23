import Echo from 'laravel-echo';
import { useEffect } from 'react'
import SocketIOClient from 'socket.io-client';

// Хук для подписки на события через WebSockets

export const useWebSocketEventHandler = (eventName, channelName, eventHandler) => {
  
  //const socketRef = useRef()

  useEffect(() => {

      window.io = SocketIOClient
      
      const echo = new Echo({
        broadcaster: 'socket.io',
        host: process.env.API_SOCKET_URL
      })

      echo.channel(channelName)

      echo.connector.socket.on(eventName, eventHandler)

      // window.echo = echo

      return () => {
        echo.connector.socket.off('new_click')
        echo.connector.socket.disconnect()
      }

  }, [])
  
}
