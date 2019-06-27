import React, {Component} from 'react';
import SimpleChart from '../components/SimpleChart.jsx';

class Market extends React.Component{
    componentDidMount(){
        this.state = {renderChart: Math.random()};
        this.props.lista.map(function(player) {
        })
        this.renderChart = this.state.renderChart;
    }

    handleClick(id) {
        if (document.getElementById(id).classList.contains('active')) {
            document.getElementById(id).classList.remove('active')
        }  else { 
            document.getElementById(id).classList.add('active');
            this.setState({renderChart: Math.random()})
            this.renderChart = this.state.renderChart;
        }
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
                            this.props.lista.map((object, index) => {
                              return (
                                <div key={object.player.number} id={object.player.number}  className="table-line-body">
                                    <div className="top-line-body" onClick={() => this.handleClick(object.player.number)}>
                                        <div className="column-number"><span>{object.player.number}</span></div>
                                        <div className="column-player">
                                            <img className="img-player" src={object.player.img} alt="img player"/>
                                            <span>{object.player.name}</span>
                                            </div>
                                        <div className="column-actual-price"><span>{object.player.actualPrice}</span></div>
                                        <div className="column-price"><span>{object.player.smallerPrice}</span></div>
                                        <div className="column-price"><span>{object.player.biggerPrice}</span></div>
                                        <div className="column-variation"><span>{object.player.variation}</span></div>
                                        <div className="icon">^</div>
                                        </div>
                                    <div className="chart-space">
                                        <SimpleChart renderChart={this.renderChart} chartId={object.player.chartId}></SimpleChart> 
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