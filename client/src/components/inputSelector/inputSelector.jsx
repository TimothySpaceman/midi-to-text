import cls from "./inputSelector.module.css";
import {useContext, useEffect, useState} from "react";
import {SocketContext} from "../sockets/socketContext.jsx";
import {MttContext} from "../mtt/mttContext.jsx";
import {Panel} from "../panel/panel.jsx";


export const InputSelector = () => {
    const {inputDevice, setInputDevice} = useContext(MttContext);
    const {socket, connected} = useContext(SocketContext);

    const [inputDevices, setInputDevices] = useState([])

    useEffect(() => {
        function receiveInputs(inputs){
            setInputDevices(inputs)
        }

        socket.on("receive-midi-inputs", receiveInputs)
        socket.emit("get-midi-inputs")

        return ()=>{
            socket.off("receive-midi-inputs", receiveInputs)
        }
    }, [connected]);

    function onInputSelected (e) {
        setInputDevice(e.target.value)
    }

    return <Panel title={"Input device"}>
        <select className={cls.inputSelector} onChange={onInputSelected} value={inputDevice}>
            <option disabled key={"EMPTY-MIDI-INPUT-DEVICE"} value={"EMPTY-MIDI-INPUT-DEVICE"}>No device selected</option>
            {inputDevices.map((i, idx) => <option key={`i${i} - ${idx}`} value={i}>{i}</option>)}
        </select>
    </Panel>;
}