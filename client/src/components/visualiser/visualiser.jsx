import {Panel} from "../panel/panel.jsx";
import {useContext, useEffect, useRef, useState} from "react";
import {MttContext} from "../mtt/mttContext.jsx";
import {Keyboard} from "./components/keyborad/keyboard.jsx";
import cls from "./visualiser.module.css"


const Tweaks = ({settings, setSettings}) => {
    return <div className={cls.tweaks}>
        <div>
            <span>Pitch: </span>
            <label htmlFor="visualiser-pitch-checkbox">
                {settings.pitch ? "On" : "Off"}
                <input
                    type="checkbox"
                    checked={settings.pitch}
                    onChange={(e) => setSettings({...settings, pitch: e.target.checked})}
                    id="visualiser-pitch-checkbox"
                />
            </label>
        </div>
        <div>
            <span>Controls: </span>
            <label htmlFor="visualiser-controls-checkbox">
                {settings.controls ? "On" : "Off"}
                <input
                    type="checkbox"
                    checked={settings.controls}
                    onChange={(e) => setSettings({...settings, controls: e.target.checked})}
                    id="visualiser-controls-checkbox"
                />
            </label>
        </div>
        <div>
            <span>Pressed Notes: </span>
            <label htmlFor="visualiser-pressedNotes-checkbox">
                {settings.pressedNotes ? "On" : "Off"}
                <input
                    type="checkbox"
                    checked={settings.pressedNotes}
                    onChange={(e) => setSettings({...settings, pressedNotes: e.target.checked})}
                    id="visualiser-pressedNotes-checkbox"
                />
            </label>
        </div>
        <div>
            <span>Keyboard: </span>
            <label htmlFor="visualiser-keyboard-checkbox">
                {settings.keyboard ? "On" : "Off"}
                <input
                    type="checkbox"
                    checked={settings.keyboard}
                    onChange={(e) => setSettings({...settings, keyboard: e.target.checked})}
                    id="visualiser-keyboard-checkbox"
                />
            </label>
        </div>
        <div>
            <span>Min Octave: </span>
            <input
                type="number"
                min={-2}
                max={9}
                value={settings.keyboardMin}
                onChange={(e) => setSettings({...settings, keyboardMin: e.target.value})}
            />
        </div>
        <div>
            <span>Max Octave: </span>
            <input
                type="number"
                min={-2}
                max={9}
                value={settings.keyboardMax}
                onChange={(e) => setSettings({...settings, keyboardMax: e.target.value})}
            />
        </div>
    </div>
}

export const Visualiser = () => {
    const {inputState} = useContext(MttContext)
    const [settings, setSettings] = useState({
        tweaks: false,
        pitch: true,
        controls: false,
        pressedNotes: true,
        keyboard: true,
        keyboardMin: 1,
        keyboardMax: 6,
    })

    let controls = Object.keys(inputState.controls ?? {})
        .map(control => ({
            control,
            value: inputState.controls[control]
        }))
        .sort((a, b) => a - b);

    return <Panel
        title={"Visualiser"}
        heading={<div className={cls.tweaksButton}>
            <label htmlFor="visualiser-tweaks-checkbox">
                ⚙
                <input
                    type="checkbox"
                    checked={settings.tweaks}
                    onChange={(e) => setSettings({...settings, tweaks: e.target.checked})}
                    id="visualiser-tweaks-checkbox"
                />
            </label>
        </div>}
    >
        <div className={cls.visualiser}>
            {settings.tweaks && <Tweaks settings={settings} setSettings={setSettings}/>}
            {settings.pitch && <div className={cls.pitch}>
                <span>Pitch:</span>
                <span
                    key={`pitch${inputState.pitch}`}
                    className={cls.changed}
                >
                    {` ${inputState.pitch}`}
                </span>
            </div>}
            {settings.controls && <div className={cls.controls}>
                <span>Controls:</span>
                <div>
                    {controls.map(c => <div className={cls.control}>
                        <span
                            key={`controlName${c.control}${c.value}`}
                            className={cls.controlName}
                        >
                            {`${c.control}: `}
                        </span>
                        <span
                            key={`controlValue${c.control}${c.value}`}
                            className={cls.changed}
                        >
                            {c.value}
                        </span>
                    </div>)}
                </div>
            </div>}
            {settings.pressedNotes && <div className={cls.pressedNotes}>
                <span>Pressed notes: </span>
                {...(inputState.pressedNotes ?? []).map(n => [
                    <span
                        className={cls.changed}
                    >
                        {n}
                    </span>,
                    <span>, </span>
                ])}
            </div>}
            {settings.keyboard && <Keyboard
                pressed={inputState.pressedNotes}
                minOctave={+settings.keyboardMin}
                maxOctave={+settings.keyboardMax}
            />}
        </div>
    </Panel>
}