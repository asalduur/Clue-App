import { Switch, Route } from "react-router-dom";
import Game from "./components/Game";
import GameStart from './components/GameStart';

export default (
  <Switch>
    <Route exact path="/" component={GameStart} />
    <Route path="/game" component={Game} />
  </Switch>
);
