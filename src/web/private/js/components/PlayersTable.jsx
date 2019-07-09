import React, {Component} from 'react';
import SimpleChart from '../components/SimpleChart.jsx';
import Loader from 'react-loader-spinner';
import InfiniteScroll from 'react-infinite-scroller';
// import { threadId } from 'worker_threads';

class Market extends React.Component{
    constructor() {
        super();    
        this.state = {plataform: 1, offsetInicial: 11, showMoreData: true, loaderButtonShowMore: false, modal: {show:false, idPlayer: 'id', namePlayer: 'name'}};    
    }
    
    componentDidMount(){
        this.props.lista.map(function(player) {
        })
        this.renderChart = this.state.renderChart;
        this.getList(this.state.plataform, '0', '10', true, this.props.tela);
    }
    
    getList(idPlataform, offset, qtd, firstCharge, tela) {
        // tela = tela.toUpperCase();
        if(tela == 'mercado') {
           this.getMarketList(idPlataform, offset, qtd, firstCharge);
        } else if (tela == 'carteira'){
            this.getWalletList(idPlataform, offset, '8', firstCharge)
        }
    }

    getMarketList(idPlataform, offset, qtd, firstCharge) {
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
                if(offset == '0') {
                    this.setState({lista:this.serverAns.data});
                } else if (offset != '0') {
                    this.setState({lista: this.state.lista.concat(this.serverAns.data)});
                }
                
                if(firstCharge && idPlataform == 1) {
                    this.setState({xBoxLista:this.state.lista});
                } else if(firstCharge && idPlataform == 2) {
                    this.setState({ps4Lista:this.state.lista});
                } else if(firstCharge && idPlataform == 3) {
                    this.setState({pcLista:this.state.lista});
                }    
                this.setState({loaderButtonShowMore: false})       
            }
        });
    }

    
    getLastPrice(player, callback){
        
        
    }

    getPrice(price) {
        return price;
    }

    getWalletList(idPlataform, offset, qtd, firstCharge) {
        $.ajax({
            url: '/user/getWallet',
            dataType: 'json',
            type: 'post',
            contentType: 'application/json',
            data: JSON.stringify({
                "idPlatform": this.state.plataform , //tu que passa
                "offset": offset, // se não passa ele pegar a partir do 0
                "qtd": qtd, //se não passar ele pega tudo, acho que pode ser assim pra não dar muito trabalho e tal   
            }),
            success: (ans) => { this.serverAns = ans; },
            error: (err) => { this.serverAns = err.responseJSON },
            complete: () => {
                console.log('exemplo de getWallet -> ' ,this.serverAns.data)
                this.serverAns.data.forEach((e, i) => {
                    let serverAns2 = {};
                    var count = 0;
                    let dados = {
                        "idPlayer": e.idPlayer, //pegar
                        "idPlatform": this.state.plataform //pegar
                    }
                    $.ajax({
                        url: '/player/getLastPrice',
                        dataType: 'json',
                        type: 'post',
                        data: JSON.stringify(dados),
                        contentType: 'application/json',
                        success: (ans) => { serverAns2 = ans; },
                        error: (err) => { serverAns2 = err.responseJSON },
                        complete: () => {
                            e.price = serverAns2.data.price;
                            // if(count++ == this.serverAns.data.length-1) {
                                this.setState({lista: this.serverAns.data})
                            // }
                        }
                    });
                    
                });

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

    handleClick(index) {
        if (document.getElementById(index).classList.contains('active')) {
            document.getElementById(index).classList.remove('active')
        }  else { 
            document.getElementById(index).classList.add('active');
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

    getVariationWallet(precoPago, precoPlayer) {
        var variationDiv = '';
        var variationColor = 'column-variation green-variation';
        if(5 < 0) {
            var variationColor = 'column-variation red-variation';
        }
        return variationDiv = <div className={variationColor}><span className="arrow-icon">^</span><span>5%</span></div>
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
            this.getList(res, '0', '10', true, this.props.tela);
        }

        if(res == 3 && this.state.pcLista) {
            this.setState({lista: this.state.pcLista})
        } else if(res == 3 && !this.state.pcLista) {
            this.getList(res, '0', '10', true, this.props.tela);
        }
        
    }

    getMoreData(idPlataform, pontoInicial, qtde, firstCharge, tela){
        let soma  = pontoInicial +11;
        let offset = pontoInicial;
        this.setState({loaderButtonShowMore: true, offsetInicial: soma})
        this.getList(idPlataform, offset, qtde, firstCharge, tela);
    }

    deleteDataWallet(id){
        let serverAns = {};
        let dados = {
            "idBuy": id, //pegar da linha que ele escolheu editar, tu recebeu essa info no getMyWallet ali em cima
        }
        $.ajax({
            url: '/user/deleteDataOnWallet',
            dataType: 'json',
            type: 'post',
            data: JSON.stringify(dados),
            contentType: 'application/json',
            success: (ans) => { serverAns = ans; },
            error: (err) => { serverAns = err.responseJSON },
            complete: () => {
               console.log('deleteDataWallet -> ', serverAns);
               this.closeModal();
               this.getWalletList(this.state.plataform, '0', '8', true, this.props.tela)
            }
        });
    }

    closeModal(){
        let modalInfo = {
            show: false,
        }
        this.setState({modal: modalInfo})
    }

    deleteDataWalletModal(e, id, name){
        let modalInfo = {
            show: true,
            idPlayer: id,
            namePlayer: name
        }
        this.setState({modal: modalInfo})
        e.stopPropagation();
        
    }
    
    render(){
        console.log('rende table ', this.props.tela);
        let letModal = '';
        let letModalClass;
        let tableItens;
        let showMoreDataButton;
        let ps4Class = 'ps4-option';
        let item1Tabela;
        let item2Tabela;
        let item3Tabela;
        let item4Tabela;
        let item5Tabela;
        let item6Tabela;
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
        }else if(this.state.lista && this.props.tela == 'mercado'){
            item1Tabela = '#';
            item2Tabela = 'Jogador';
            item3Tabela = 'Preço atual';
            item4Tabela = 'Menor preço (24h)';
            item5Tabela = <div className="header-column-price"><span>Maior preço (24h)</span></div>;
            item6Tabela = 'Variação (24h)';
            

            tableItens =<div>{(this.state.lista || []).map((object, index) => (
                
                <div key={object.idPlayer} id={index}  className="table-line-body">
                    <div className="top-line-body" onClick={() => this.handleClick(index)}>
                        <div className="column-number" title={object.idPlayer}><span>{object.idPlayer}</span></div>
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
                        <SimpleChart show={this.state.lista[index].show} playerId={object.idPlayer} chartId={index+'b'}></SimpleChart> 
                    </div>
                </div>
              )
            )}</div>

            console.log(this.state.loaderButtonShowMore)

            if(this.state.showMoreData && !this.state.loaderButtonShowMore) {
                showMoreDataButton = <div className="linha-show-more">
                                        <div onClick={() => this.getMoreData(this.state.plataform, this.state.offsetInicial, '10', true, this.props.tela)} 
                                        className="show-more-data-btn">Mais jogadores</div>
                                    </div>    
            }

            if (this.state.loaderButtonShowMore){
                showMoreDataButton = <div className="loader-btn-show"><Loader type="Triangle" color="#663ab5" height={40} width={40} /></div>;
            }
            
        } else if(this.state.lista && this.props.tela == "carteira") {
            item1Tabela = '#';
            item2Tabela = 'Jogador';
            item3Tabela = 'Preço atual';
            item4Tabela = 'Preço pago';
            item5Tabela = '';
            item6Tabela = 'Variação (24h)';

            letModalClass = 'modal-teste'
            if(this.state.modal.show) {
                letModalClass = 'modal-teste active'
            }
            letModal = <div className={letModalClass}>
                <span>Tem certeza que deseja remover o jogador <span className="span-name-player">{this.state.modal.namePlayer}</span>?</span>
                 <div className="modal-buttons">
                    <div onClick={()=> this.deleteDataWallet(this.state.modal.idPlayer)} className="modal-sim">Sim!</div> 
                    <div onClick={()=> this.closeModal()} className="modal-nao">Não</div>
                 </div>
            </div>
            
            tableItens =<div>{(this.state.lista || []).map((object, index) => (
                
                <div key={object.idPlayer} id={index}  className="table-line-body">
                    <div className="top-line-body" onClick={() => this.handleClick(index)}>
                        <div className="column-number" title={object.idPlayer}><span>{object.idPlayer}</span></div>
                        <div className="column-player">
                            <img className="img-player" src="/assets/bola.png" alt="img player"/>
                            <span title={object.name}>{object.name}</span>
                            </div>
                            {/* {object.lastPrice.toLocaleString("pt-BR")} */}
                        <div className="column-actual-price"><span>R${(object.price || '').toLocaleString("pt-BR")}</span></div>
                        <div className="column-price"><span>R${object.userPrice.toLocaleString("pt-BR")}</span></div>
                        {this.getVariationWallet(object.variationLowPrice)}
                        <div className="icon icon-wallet">^</div>
                        <div className="remove-compra" onClick={(e) => this.deleteDataWalletModal(e, object.idBuy, object.name)}>Deletar</div>
                        </div>
                    <div className="chart-space">
                        <SimpleChart show={this.state.lista[index].show} playerId={object.idPlayer} chartId={index+'b'}></SimpleChart> 
                    </div>
                </div>
              )
            )}</div>
            
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
                            <div className="header-column-number column-number"><span>{item1Tabela}</span></div>
                            <div className="header-column-player"><span>{item2Tabela}</span></div>
                            <div className="header-column-actual-price"><span>{item3Tabela}</span></div>
                            <div className="header-column-price"><span>{item4Tabela}</span></div>
                            {item5Tabela}
                            <div className="header-column-variation"><span>{item6Tabela}</span></div>
                        </div>
                        {tableItens}
                        {showMoreDataButton}
                    </div>
                    {letModal}
                </div>
            </React.Fragment>
        )
    }
}
export default Market;