import React, {Component} from 'react';
import {
    BrowserRouter as Router, 
    Route, 
    Switch,
    Redirect
} from 'react-router-dom'; 

// views
import LoginView from '../js/screens/Login.jsx';
import WalletView from '../js/screens/Wallet.jsx';
import MarketView from '../js/screens/Market.jsx';


const PrivateRoute = ({component:Component, ...rest})=> {
    console.log('rest no privateRoutes', rest)
    return (
        <Route {...rest} render={(props)=>(
            rest.isLogged === true
            ? <Component {...rest}/>
            : <Redirect to='/login'/>
        )}/>
    )
}


/**
 * @summary Defined the app route application and which routes are protected
 */
class AppRoutes extends Component{
    constructor(){
        super()
        this.state = {
            isLogged : null,
        };
        this.cbSetState = this.cbSetState.bind(this);
    }
    cbSetState(bool){
        this.setState({isLogged:bool != undefined ? bool : null});
    }
    componentDidMount(){
        $.ajax({
            url: '/users/isLogged',
            dataType: 'json',
            type: 'post',
            contentType: 'application/json',
            data: JSON.stringify({teste:'oi'}),
            success: (ans) => { this.response = ans.data; },
            error: (err) => { this.response = {error : err.responseJSON.error} },
            complete: () => {
                if(this.response != undefined && this.response == true){
                    this.setState({isLogged:true});
                }else{  
                    this.setState({isLogged:false});
                }
            }
        });
    }
    render(){
        const isLogged = this.state.isLogged;
        if (isLogged == null) {
            return <div></div>
        }
        console.log('appRoutes > state', this.state)
        return(
            <Router>    
                <Switch>
                    <PrivateRoute path='/wallet' component={WalletView} cbSetState={this.cbSetState} isLogged={this.state.isLogged} history={history}/>
                    <PrivateRoute path='/market' component={MarketView} cbSetState={this.cbSetState} isLogged={this.state.isLogged}/>
                    <Route path='/' component={(props)=> (<LoginView {...props} cbSetState={this.cbSetState} isLogged={isLogged}/>)}/>
                </Switch>
            </Router>
        )
    }

}
export default AppRoutes;