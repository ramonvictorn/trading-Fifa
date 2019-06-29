import React, {Component} from 'react';
import SimpleChart from '../components/SimpleChart.jsx';
import Loader from 'react-loader-spinner';


class Market extends React.Component{
    constructor() {
        super();    
        this.state = {lista : []};    
    }
    componentDidMount(){
        this.state = {renderChart: Math.random()};
        this.props.lista.map(function(player) {
        })
        this.renderChart = this.state.renderChart;
        this.getList('1', '0', '10');
        
    }

    getList(idPlataform, offset, qtd) {
        $.ajax({
            url: '/getRankingVariationLowPrice',
            dataType: 'json',
            type: 'post',
            contentType: 'application/json',
            data: JSON.stringify({
                "idPlatform": idPlataform,
                "offset": offset,
                "qtd": qtd  
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

    handleClick(id) {
        if (document.getElementById(id).classList.contains('active')) {
            document.getElementById(id).classList.remove('active')
        }  else { 
            document.getElementById(id).classList.add('active');
            this.setState({renderChart: Math.random()})
            this.renderChart = this.state.renderChart;
        }
    }

    isEmpty(obj) {
        for(var prop in obj) {
            if(obj.hasOwnProperty(prop))
                return false;
        }
    
        return true;
    }

    render(){
        let tableItens;

        if(this.isEmpty(this.state.lista)) {
            tableItens = <div className="loader"><Loader type="Triangle" color="#663ab5" height={80} width={80} /></div>
        } else {
            tableItens = this.state.lista.map((object, index) => {
                return (
                  <div key={object.idPlayer} id={object.idPlayer}  className="table-line-body">
                      <div className="top-line-body" onClick={() => this.handleClick(object.idPlayer)}>
                          <div className="column-number"><span>{object.idPlayer}</span></div>
                          <div className="column-player">
                              <img className="img-player" src="/assets/bola.png" alt="img player"/>
                              <span title={object.name}>{object.name}</span>
                              </div>
                          <div className="column-actual-price"><span>R${object.lastPrice.toLocaleString("pt-BR")}</span></div>
                          <div className="column-price"><span>R${object.lowerPriceLastDay.toLocaleString("pt-BR")}</span></div>
                          <div className="column-price"><span>R${object.higherPriceLastDay.toLocaleString("pt-BR")}</span></div>
                          <div className="column-variation"><span>{object.variationHighPrice}</span></div>
                          <div className="icon">^</div>
                          </div>
                      <div className="chart-space">
                          <SimpleChart renderChart={this.renderChart} chartId={object.idPlayer+'b'}></SimpleChart> 
                      </div>
                  </div>
                );
              })
        }
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
                        {tableItens}
                    </div>
                </div>
            </React.Fragment>
        )
    }
}
export default Market;