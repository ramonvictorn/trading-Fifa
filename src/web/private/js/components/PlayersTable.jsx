import React, {Component} from 'react';
import SimpleChart from '../components/SimpleChart.jsx';

class Market extends React.Component{
    componentDidMount(){
        this.props.lista.map(function(player) {
            console.log(player)
        })
    }
    render(){
        return(
            <React.Fragment>
                <div className="body-page">
                    <div className="table">
                        <div className="table-header">
                            <div className="header-column-number column-number"><span>#</span></div>
                            <div className="header-column-player"><span>Jogador</span></div>
                            <div className="header-column-actual-price"><span>Preço atual</span></div>
                            <div className="header-column-price"><span>Menor preço (24h)</span></div>
                            <div className="header-column-price"><span>Maior preço (24h)</span></div>
                            <div className="header-column-variation"><span>Variação (24h)</span></div>
                        </div>
                        {
                            this.props.lista.map(function(object){
                              return (
                                <div key={object.player.number} className="table-line-body">
                                    <div className="top-line-body">
                                        <div className="column-number"><span>{object.player.number}</span></div>
                                        <div className="column-player">
                                            <img className="img-player" src={object.player.img} alt="img player"/>
                                            <span>{object.player.name}</span>
                                            </div>
                                        <div className="column-actual-price"><span>{object.player.actualPrice}</span></div>
                                        <div className="column-price"><span>{object.player.smallerPrice}</span></div>
                                        <div className="column-price"><span>{object.player.biggerPrice}</span></div>
                                        <div className="column-variation"><span>{object.player.variation}</span></div>
                                        <div className="down-arrow">??</div>
                                        </div>
                                    <div className="chart-space">
                                        <SimpleChart chartId={object.player.chartId}></SimpleChart> 
                                    </div>
                                </div>
                              );
                            })
                          }
                    </div>
                </div>
            </React.Fragment>
        )
    }
}
export default Market;