import React, {Component} from 'react'
import {
    BrowserRouter as Router, 
    Route, 
    Switch,
    Redirect
} from 'react-router-dom'; 

// views
import LoginView from '../js/screens/Login.jsx';
import WalletView from '../js/screens/Wallet.jsx';
import HomeView from '../js/screens/Home.jsx';




/**
 * @summary Defined the app route application and which routes are protected
 */
class AppRoutes extends Component{
    constructor(){
        super()
    }

    render(){

        return(
            <Router>    
                <Switch>
                    <Route path='/wallet' component={WalletView} history={history}/>
                    <Route path='/home' component={HomeView} history={history}/>
                    <Route path='/' component={LoginView}/>
                </Switch>
            </Router>
        )
    }

}
export default AppRoutes;