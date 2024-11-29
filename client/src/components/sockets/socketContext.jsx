import {createContext, useState} from "react";
import {io} from "socket.io-client";

export const SocketContext = createContext();

export const WithSocket = ({children}) => {
    const [hostUrl, setHostUrl] = useState("http://localhost:3000");
    const [socket, setSocket] = useState(io());
    const [connected, setConnected] = useState(socket?.connected ?? false)

    const context = {
        hostUrl,
        setHostUrl,
        socket,
        setSocket,
        connected,
        connect: function(){
            const s = io(hostUrl);

            function onConnect() {
                setConnected(true);
            }

            function onDisconnect() {
                setConnected(false);
            }

            function onLog(data){
                console.log("[Server]", data)
            }


            s.on('connect', onConnect);
            s.on('disconnect', onDisconnect);
            s.on('log', onLog);

            setSocket(s);

            return () => {
                s.off('connect', onConnect);
                s.off('disconnect', onDisconnect);
                s.off('log', onLog);
            };
        }
    }

    return <SocketContext.Provider value={context}>
        {children}
    </SocketContext.Provider>
}