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
        $.ajax({
            url: '/getRankingVariationLowPrice',
            dataType: 'json',
            type: 'post',
            contentType: 'application/json',
            data: JSON.stringify({
                "idPlatform":"1",
                "offset": "0",
                "qtd":"10"   
            }),
            success: (ans) => { this.serverAns = ans; },
            error: (err) => { this.serverAns = err.responseJSON },
            complete: () => {
                console.log(this.serverAns.data)
                this.setState({lista:this.serverAns.data});

                if(this.serverAns.data){
                    this.props.callback(true);
                }else{
                    this.props.callback(false);
                }
            }
        });
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