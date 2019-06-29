import React, {Component} from 'react';
import SimpleChart from '../components/SimpleChart.jsx';
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
                <div className="console-options">
                    <div className="ps4-option">
                        <img src="/assets/ps4.png" alt=""/>
                    </div>
                    <div className="xbox-option">
                        <img src="/assets/xbox.svg" alt=""/>
                    </div>
                    <div className="pc-option">
                        <img src="/assets/pc.png" alt=""/>
                    </div>
                </div>
                <PageNavigation cbSetState={this.props.cbSetState}></PageNavigation>
                <PlayersTable lista={this.state.lista}></PlayersTable>
            </React.Fragment>
        )
    }
}
export default Market;