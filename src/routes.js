import { Switch, Route } from "react-router-dom";
import Game from "./components/Game";
import Lobby from "./components/Lobby";
// import Rules from './components/Rules'
export default (
  <Switch>
    <Route exact path="/" component={Lobby} />
    <Route path="/game" component={Game} />
    {/* <Route path='/rules' component={Rules} /> */}
  </Switch>
);
