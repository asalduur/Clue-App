import { Switch, Route } from "react-router-dom";
import Game from "./components/Game";
import Lobby from "./components/Lobby";
import GameStart from './components/GameStart';
// import Rules from './components/Rules'
export default (
  <Switch>
    <Route exact path="/" component={GameStart} />
    <Route path="/game" component={Game} />
    {/* <Route path='/rules' component={Rules} /> */}
  </Switch>
);
