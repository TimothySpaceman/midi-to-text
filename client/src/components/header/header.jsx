import cls from "./header.module.css";
import {useContext, useEffect} from "react";
import {SocketContext} from "../sockets/socketContext.jsx";


export const Header = () => {
    const {hostUrl, setHostUrl, socket, connect, connected} = useContext(SocketContext);

    function handleConnect() {
        connect();
    }

    function handleDisconnect() {
        socket.close();
    }

    return <div className={cls.header}>
        <div>
            <input
                placeholder={"Host URL"}
                disabled={connected}
                value={hostUrl}
                onChange={e => setHostUrl(e.target.value)}
            />
            {connected ?
                <button onClick={handleDisconnect}>Disconnect</button> :
                <button onClick={handleConnect}>Connect</button>
            }
        </div>
        <div>
            <span className={cls.statusLabel}>Status: </span>
            {connected ?
                <span className={cls.statusConnected}>Connected</span> :
                <span className={cls.statusDisconnected}>No connection</span>
            }
        </div>
    </div>;
}