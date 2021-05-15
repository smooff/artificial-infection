import './App.css';

import WelcomePage from "./pages/welcomePage/WelcomePage";
import {BrowserRouter as Router} from "react-router-dom";
import {Route, Switch} from "react-router-dom";
import MainPage from "./pages/mainPage/MainPage";
import {RecoilRoot} from "recoil";


function App() {
    return (
        <Router>
            {/*vsetko co je v recoilroute, dane komponenty mozu zdielat recoil state*/}
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
