import {createContext, useContext, useEffect, useState} from "react";
import {SocketContext} from "../sockets/socketContext.jsx";

export const MttContext = createContext();

export const WithMTT = ({children}) => {
    const {socket, connected} = useContext(SocketContext);

    const defaultState = {
        inputDevice: "EMPTY-MIDI-INPUT-DEVICE",
        inputState: {
            pitch: 0,
            controls: {},
            pressedNotes: []
        }
    };

    const [contextState, setContextState] = useState(defaultState)

    const {inputDevice, inputState} = contextState
    const setInputDevice = (inputDevice) => setContextState(o=>({...o, inputDevice}))
    const setInputState = (inputState) => setContextState(o=>({...o, inputState}))

    const listeners = [
        {
            event: "midi-input-changed",
            cb: function(inputName) {
                setInputDevice(inputName)
            }
        },
        {
            event: "noteon",
            cb: function(data) {
                console.log(data)
                setInputState(data.inputState)
            }
        },
        {
            event: "noteoff",
            cb: function({inputState}) {
                setInputState(inputState)
            }
        },
        {
            event: "cc",
            cb: function({inputState}) {
                setInputState(inputState)
            }
        },
        {
            event: "pitch",
            cb: function({inputState}) {
                setInputState(inputState)
            }
        },
    ]

    useEffect(()=>{
        const removeListeners = () => {
            listeners.forEach(l => {
                socket.off(l.event, l.cb)
            })
        }

        listeners.forEach(l => {
            socket.on(l.event, l.cb)
        })

        if(!connected){
            setContextState(defaultState)

            return removeListeners;
        }

        socket.once("receive-midi-input", (inputName)=>setInputDevice(inputName))
        socket.emit("get-midi-input")

        socket.once("receive-input-state", (inputState)=>setInputState(inputState))
        socket.emit("get-input-state")

        return removeListeners;
    }, [socket, connected])


    const context = {
        inputDevice,
        setInputDevice: function(inputDevice){
            socket.emit("set-midi-input", inputDevice);
        },
        inputState,
    }

    return <MttContext.Provider value={context}>
        {children}
    </MttContext.Provider>
}