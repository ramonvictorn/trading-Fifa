import React, {Component} from 'react';
import { NavLink } from 'react-router-dom'

class Market extends React.Component{
    render(){
        return(
            <React.Fragment>
                <div className="navigation">
                    <NavLink to="/Wallet" activeClassName="selected">Wallet</NavLink>
                    <NavLink to="/Market" activeClassName="selected">Market</NavLink>
                    <div className="logout"><img src="https://cdn1.iconfinder.com/data/icons/basic-application-vol-1/128/Material_Design-49-512.png" alt=""/></div>
                </div>
            </React.Fragment>
        )
    }
}
export default Market;