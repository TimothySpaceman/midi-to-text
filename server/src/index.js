import {socketIO as io} from "./server.js";
import * as em from "easymidi";
import {midiToText as m} from "./midiToText.js";

// MIDI INPUT LOGS
// m.on("noteon", (e)=>{
//     console.log("Note on", e)
// })
// m.on("noteoff", (e)=>{
//     console.log("Note off", e)
// })
// m.on("cc", (e)=>{
//     console.log("Control", e)
// })
// m.on("pitch", (e)=>{
//     console.log("Pitch", e)
// })


// MIDI TO SOCKET IO
m.on("noteon", (e)=>{
    io.sockets.emit("noteon", e)
})
m.on("noteoff", (e)=>{
    io.sockets.emit("noteoff", e)
})
m.on("cc", (e)=>{
    io.sockets.emit("cc", e)
})
m.on("pitch", (e)=>{
    io.sockets.emit("pitch", e)
})

// SOCKET IO CLIENT-SPECIFIC LISTENERS
io.on("connection", (s) => {
    s.on("get-midi-inputs", ()=>{
        s.emit("receive-midi-inputs", em.getInputs())
    })

    s.on("set-midi-input", (inputName)=>{
        try {
            m.setInput(inputName)
            io.sockets.emit("midi-input-changed", inputName)
        } catch (e) {
            console.log(e)
            s.emit("log", e.toString())
        }
    })
})

console.log("Starting SocketIO server on port 3000");
io.listen(3000);
