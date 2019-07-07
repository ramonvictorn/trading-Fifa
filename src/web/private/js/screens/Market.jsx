import React, {Component} from 'react';
import PageNavigation from '../components/PageNavigation.jsx';
import PlayersTable from '../components/PlayersTable.jsx';

class Market extends React.Component{
    constructor() {
        super();    
        this.state = {lista : []};    
    }

    componentDidMount(){  
        
    } 


    getRanking(){
        
    }

      
    render(){
        console.log('props da vie ', this.props)
        return(
            <React.Fragment>
                <PageNavigation cbSetState={this.props.cbSetState}></PageNavigation>
                <PlayersTable lista={this.state.lista} tela="mercado"></PlayersTable>
            </React.Fragment>
        )
    }
}
export default Market;