import cls from "./panel.module.css"
import {useContext} from "react";
import {SocketContext} from "../sockets/socketContext.jsx";

export const Panel = ({title, heading, children}) => {
    const {connected} = useContext(SocketContext)

    return <div className={cls.panel}>
        <div className={cls.headingContainer}>
            <span className={cls.title}>{title}</span>
            {heading}
        </div>
        <div className={cls.content}>
            {children}
        </div>
        {!connected && <div className={cls.disabledOverlay}></div>}
    </div>
}