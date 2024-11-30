import cls from "./keyboardOctave.module.css"

export const KeyboardOctave = ({pressed = []}) => {
    const keys = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"]

    return <div className={cls.keyboardOctave}>
        {keys.map(key => {
            let classes = `${cls.key} `
            classes += `${key.includes("#") ? cls.black : cls.white} `
            classes += `${pressed.includes(key) ? cls.pressed : ""} `

            return <div className={classes}></div>
        })}
    </div>
}