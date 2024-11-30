import cls from "./app.module.css"
import "./themes/theme.css"
import {WithSocket} from "./components/sockets/socketContext.jsx";
import {Header} from "./components/header/header.jsx";
import {InputSelector} from "./components/inputSelector/inputSelector.jsx";
import {WithMTT} from "./components/mtt/mttContext.jsx";
import {Visualiser} from "./components/visualiser/visualiser.jsx";

function App() {
    return (
        <WithSocket>
            <WithMTT>
                <div className={cls.main}>
                    <Header/>
                    <div className={cls.controlPanel}>
                        <InputSelector/>
                        <Visualiser/>
                    </div>
                </div>
            </WithMTT>
        </WithSocket>
    )
}

export default App
