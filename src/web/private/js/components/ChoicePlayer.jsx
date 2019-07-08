import React, {Component} from 'react';
import {
    BrowserRouter as Router, 
    Route, 
    Switch,
    Redirect
} from 'react-router-dom';

class ChoicePlayer extends Component{
    constructor(){
        super();
    }
    render(){
        let optionSelect = [];
        let arrayData = this.props.listaPlayers || [];
        let players = arrayData.map((ele,index)=>{
            optionSelect.push(<option key={index} value={ele.idPlayer}>{ele.name}</option>)
        })
        return(
            <React.Fragment>
                <select name="choicePlayer">
                    {optionSelect}
                </select>
            </React.Fragment>
        )
    }
}

export default ChoicePlayer;