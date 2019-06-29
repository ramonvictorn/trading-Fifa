import React, {Component} from 'react';
import { NavLink } from 'react-router-dom'

class Market extends React.Component{
    constructor(){
        super();
        this.logout = this.logout.bind(this);
    }
    logout(){
        let serverAns = {};
        $.ajax({
            url: '/logout',
            dataType: 'json',
            type: 'post',
            contentType: 'application/json',
            success: (ans) => { serverAns = ans; },
            error: (err) => { serverAns = err.responseJSON },
            complete: () => {
                // console.log('COMPLETE LOGOU ', serverAns);  
                if(!serverAns.error){
                    this.props.cbSetState(false);
                }  
            }
        });
    }
    render(){
        // console.log('rende dmenu props', this.props)
        return(
            <React.Fragment>
                <div className="navigation">
                    <NavLink to="/Wallet" activeClassName="selected">Wallet</NavLink>
                    <NavLink to="/Market" activeClassName="selected">Market</NavLink>
                    <div onClick={this.logout} className="logout"><img src="https://cdn1.iconfinder.com/data/icons/basic-application-vol-1/128/Material_Design-49-512.png" alt=""/></div>
                </div>
            </React.Fragment>
        )
    }
}
export default Market;