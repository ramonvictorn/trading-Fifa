import React, {Component} from 'react';
import PageNavigation from '../components/PageNavigation.jsx';

class Wallet extends React.Component{
    render(){
        return(
            <React.Fragment>
                <PageNavigation></PageNavigation>
                <h1>Wallet</h1>
            </React.Fragment>
        )
    }
}
export default Wallet;