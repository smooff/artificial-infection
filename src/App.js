import './App.css';

import WelcomePage from "./pages/welcomePage/WelcomePage";
import {BrowserRouter as Router} from "react-router-dom";
import {Route, Switch} from "react-router-dom";
import MainPage from "./pages/mainPage/MainPage";
import {RecoilRoot} from "recoil";

/**
 * Renders an App component.
 * Component is used to wrap whole application
 * @returns {JSX.Element}
 * @constructor
 * @component
 */
function App() {
    return (
        <Router>
            {/*everything insade recoilroot, those components (whole tree) are allowed to use recoil states*/}
            <RecoilRoot>
                <Switch>
                    <Route exact path="/">
                        <WelcomePage/>
                    </Route>
                    <Route path="/game">
                        <MainPage/>
                    </Route>
                </Switch>
            </RecoilRoot>
        </Router>
    );
}

export default App;
