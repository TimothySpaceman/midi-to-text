import {createContext, useContext, useEffect, useState} from "react";
import {SocketContext} from "../sockets/socketContext.jsx";

export const MttContext = createContext();

export const WithMTT = ({children}) => {
    const {socket} = useContext(SocketContext);

    const [inputDevice, setInputDevice] = useState("EMPTY-MIDI-INPUT-DEVICE");

    const listeners = [
        {
            event: "midi-input-changed",
            cb: function(inputName) {
                setInputDevice(inputName)
            }
        }
    ]

    useEffect(() => {
        listeners.forEach(l => {
            socket.on(l.event, l.cb)
        })

        return () => {
            listeners.forEach(l => {
                socket.off(l.event, l.cb)
            })
        }
    }, [socket]);

    const context = {
        inputDevice,
        setInputDevice: function(inputDevice){
            socket.emit("set-midi-input", inputDevice);
        }
    }

    return <MttContext.Provider value={context}>
        {children}
    </MttContext.Provider>
}