// import './App.css';

import WelcomePage from "./pages/welcomePage/WelcomePage";
import {BrowserRouter as Router} from "react-router-dom";
import {Route, Switch} from "react-router-dom";
import MainPage from "./pages/mainPage/MainPage";
import {RecoilRoot} from "recoil";


function App() {
    return (
        //   <div className="App">
        //       <div className="leftBar">
        //           <div className="map">this is MAP</div>
        //           <div className="bottomBar">this is BOTTOM bar</div>
        //           <Status></Status>
        //       </div>
        //
        //       <div className="rightBar">this is RIGHT bar</div>
        //
        //   </div>

        <Router>
            {/*vsetko co je v recoilroute, dane komponenty mozu zdielat state*/}
            <RecoilRoot>
            <Switch>
                <Route exact path="/">
                    <WelcomePage />
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
