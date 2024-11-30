import cls from "./keyboard.module.css"
import {KeyboardOctave} from "../keyboardOctave/keyboardOctave.jsx";

export const Keyboard = ({pressed  = [], minOctave, maxOctave}) => {
    const octaves = [...Array(maxOctave - minOctave).keys()].map(o=>o+minOctave)

    return <div className={cls.keyboard}>
        {octaves.map(o => {
            let octavePressed = pressed
                .filter(k=>k.replace(/[a-zA-Z#]/g, "") === `${o}`)
                .map(k=>k.replace(/[-\d]/g, ""))

            return <KeyboardOctave pressed={octavePressed}/>
        })}
    </div>
}