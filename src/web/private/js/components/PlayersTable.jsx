import React, {Component} from 'react';
import SimpleChart from '../components/SimpleChart.jsx';
import Loader from 'react-loader-spinner';
import InfiniteScroll from "react-infinite-scroll-component";
// import { threadId } from 'worker_threads';

class Market extends React.Component{
    constructor() {
        super();    
        this.state = {plataform: 1};    
    }
    componentDidMount(){
        this.props.lista.map(function(player) {
        })
        this.renderChart = this.state.renderChart;
        this.getList(this.state.plataform, '0', '10', true);
    }

    getList(idPlataform, offset, qtd, firstCharge) {
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
                console.log(idPlataform)
                this.setState({lista:this.serverAns.data});
                if(firstCharge && idPlataform == 1) {
                    this.setState({xBoxLista:this.state.lista});
                } else if(firstCharge && idPlataform == 2) {
                    this.setState({ps4Lista:this.state.lista});
                } else if(firstCharge && idPlataform == 3) {
                    this.setState({pcLista:this.state.lista});
                }
            }
        });
    }

    handleClick(id, index) {
        if (document.getElementById(id).classList.contains('active')) {
            document.getElementById(id).classList.remove('active')
        }  else { 
            document.getElementById(id).classList.add('active');
            this.setState({renderChart: Math.random()})
            this.state.lista[index].show = true
            
        }
        //
    }

    isEmpty(obj) {
        for(var prop in obj) {
            if(obj.hasOwnProperty(prop))
                return false;
        }
    
        return true;
    }

    getVariation(variation) {
        var variationDiv = '';
        var variationColor = 'column-variation green-variation';
        if(variation < 0) {
            var variationColor = 'column-variation red-variation';
        }
        return variationDiv = <div className={variationColor}><span className="arrow-icon">^</span><span>{variation}%</span></div>
    }

    plataformClick(res) {
        this.setState({lista: null})
        console.log('xbox: ', this.state.xBoxLista, 'ps4: ', this.state.ps4Lista, 'pc: ', this.state.pcLista)
        this.setState({plataform: res}, ()=> {this.arrayCache(res)})
        
        
    }

    arrayCache(res) {
        if(res == 1) {
            this.setState({lista: this.state.xBoxLista})
        }

        if(res == 2 && this.state.ps4Lista) {
            this.setState({lista: this.state.ps4Lista})
        } else if(res == 2 && !this.state.ps4Lista) {
            this.getList(this.state.plataform, '0', '10', true);
        }

        if(res == 3 && this.state.pcLista) {
            this.setState({lista: this.state.pcLista})
        } else if(res == 3 && !this.state.pcLista) {
            this.getList(this.state.plataform, '0', '10', true);
        }
        
    }
    render(){
        let tableItens;
        let ps4Class = 'ps4-option';
        if(this.state.plataform == 2) {
            ps4Class = 'ps4-option active';
        }
        let xboxClass = 'xbox-option';
        if(this.state.plataform == 1) {
            xboxClass = 'ps4-option active';
        }
        let pcClass = 'pc-option';
        if(this.state.plataform == 3) {
            pcClass = 'ps4-option active';
        }
        if(!this.state.lista || this.state.lista == null) {
            tableItens = <div className="loader"><Loader type="Triangle" color="#663ab5" height={80} width={80} /></div>
        } else if  (this.isEmpty(this.state.lista)){
            tableItens = <div className="no-data-found">Reclama com o backend</div>
        }else {
            tableItens = 
            <InfiniteScroll
                dataLength={5}
                next={55}
                hasMore={true}
                loader={<h4>Loading...</h4>}
                endMessage={
                    <p style={{ textAlign: "center", color:"white" }}>
                    <b>Yay! You have seen it all</b>
                    </p>
                }
                >
            {this.state.lista.map((object, index) => (
                
                <div key={object.idPlayer} id={object.idPlayer}  className="table-line-body">
                    <div className="top-line-body" onClick={() => this.handleClick(object.idPlayer, index)}>
                        <div className="column-number"><span>{object.idPlayer}</span></div>
                        <div className="column-player">
                            <img className="img-player" src="/assets/bola.png" alt="img player"/>
                            <span title={object.name}>{object.name}</span>
                            </div>
                        <div className="column-actual-price"><span>R${object.lastPrice.toLocaleString("pt-BR")}</span></div>
                        <div className="column-price"><span>R${object.lowerPriceLastDay.toLocaleString("pt-BR")}</span></div>
                        <div className="column-price"><span>R${object.higherPriceLastDay.toLocaleString("pt-BR")}</span></div>
                        {this.getVariation(object.variationLowPrice)}
                        <div className="icon">^</div>
                        </div>
                    <div className="chart-space">
                        <SimpleChart show={this.state.lista[index].show} playerId={object.idPlayer} chartId={object.idPlayer+'b'}></SimpleChart> 
                    </div>
                </div>
              )
            )}</InfiniteScroll>
            
        }
        return(
            <React.Fragment>
                <div className="body-page">
                    <div className="table">
                        <div className="console-options">
                            <div className={ps4Class} title="Playstation 4 Plataform" onClick={() => this.plataformClick(2)}>
                                <img src="/assets/ps4.png" alt=""/>
                            </div>
                            <div className={xboxClass} title="Xbox Plataform" onClick={() => this.plataformClick(1)}>
                                <img src="/assets/xbox.svg" alt=""/>
                            </div>
                            <div className={pcClass} title="Computer Plataform" onClick={() => this.plataformClick(3)}>
                                <img src="/assets/pc.png" alt=""/>
                            </div>
                        </div>
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