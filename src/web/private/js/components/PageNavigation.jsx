import React, {Component} from 'react';
import { NavLink } from 'react-router-dom'

class Market extends React.Component{
    render(){
        return(
            <React.Fragment>
                <div className="navigation">
                {/* <NavLink to="/Home" activeClassName="selected">Home</NavLink> */}
                    <NavLink to="/Wallet" activeClassName="selected">Wallet</NavLink>
                    <NavLink to="/Market" activeClassName="selected">Market</NavLink>
                </div>
            </React.Fragment>
        )
    }
}
export default Market;