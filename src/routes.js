import { Switch, Route } from "react-router-dom";
import DiceRoll from "./components/DiceRoll";
import Game from "./components/Game";
import Lobby from "./components/Lobby";
// import Rules from './components/Rules'
export default (
  <Switch>
    <Route path="/game" component={Game} />
    <Route path="/lobby" component={Lobby} />
    {/* <Route path='/rules' component={Rules} /> */}
    <Route path="/diceroll" component={DiceRoll} />{" "}
    {/* just making a path to get a display before the game component is done (where the dice roll will eventually be rendered)   */}
  </Switch>
);
