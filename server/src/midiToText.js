import * as em from "easymidi";
import ks from "node-key-sender";
import {codeToNote} from "./utils.js";
import {prepareConfig, qwertyConfig} from "./configs.js";



export class MidiToText {
    mi
    listeners
    pressedNotes
    controls
    pitch
    config

    #readingInputListeners = [
        {
            event: "noteon", callback: (e) => {
                this.pressedNotes.add(codeToNote[e.note]);
                this.processNoteInput(e)
            }
        },
        {
            event: "noteoff", callback: (e) => this.pressedNotes.delete(codeToNote[e.note])
        },
        {
            event: "cc", callback: (e) => this.controls[e.controller] = e.value
        },
        {
            event: "pitch", callback: (e) => this.pitch = e.value
        }
    ]

    constructor() {
        this.pitch = 0
        this.pressedNotes = new Set();
        this.controls = {}

        this.setConfig(qwertyConfig)

        this.listeners = [...this.#readingInputListeners];
    }

    setConfig(config){
        this.config = prepareConfig(config)
    }

    setInput(inputName) {
        this.mi?.close();
        this.mi = new em.Input(inputName);
        this.initListeners();
        console.log(`MIDI Input set: ${inputName}`)
    }

    on(event, callback) {
        this.listeners.push({event, callback})
    }

    initListeners() {
        this.listeners?.forEach(l => {
            this.mi?.on(l.event, (e) => {
                try {
                    l.callback(e)
                } catch (err) {
                    console.log(err)
                }
            })
        })
    }

    processNoteInput(e){
        let mappings = this.config.noteToKey.filter(m => m.note === codeToNote[e.note])
        mappingLoop: for(const mapping of mappings) {
            for(const [control, value] of Object.entries(mapping.required.controls)){
                if(this.controls[control] !== value){
                    continue mappingLoop;
                }
            }
            for(const note of mapping.required.notes){
                if(!this.pressedNotes.includes(note)){
                    continue mappingLoop;
                }
            }
            // ks.sendLetter(mapping.key)
            return;
        }
    }

    getInputState(){
        return {
            pressedNotes: Array.from(this.pressedNotes),
            controls: this.controls,
            pitch: this.pitch
        }
    }
}

export const midiToText = new MidiToText();

// abcdefg