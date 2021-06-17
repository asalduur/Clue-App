import {Switch, Route} from 'react-router-dom'
import Game from './components/Game'
import Lobby from './components/Lobby'
// import Rules from './components/Rules'

<Switch>
    <Route path='/game' component={Game} />
    <Route path='/lobby' component={Lobby} />
    {/* <Route path='/rules' component={Rules} /> */}

</Switch>