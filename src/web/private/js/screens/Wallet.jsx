import React, {Component} from 'react';
import PageNavigation from '../components/PageNavigation.jsx';
import PlayersTable from '../components/PlayersTable.jsx';
import ChoicePlayer from '../components/ChoicePlayer.jsx';
class Wallet extends React.Component{
    constructor(){
        super()
        this.state = {
            lista : [],
            listaWallet : [],
            listaPlayers: [],
            inputPrice : null,
            idPlayerSelect : null,
        };   
    }

    // getMyWallet(){
    //     let serverAns = {};
    //     $.ajax({
    //         url: '/user/getWallet',
    //         dataType: 'json',
    //         type: 'post',
    //         contentType: 'application/json',
    //         data: JSON.stringify({
    //             "idPlatform": 1 , //tu que passa
    //             "offset": undefined, // se não passa ele pegar a partir do 0
    //             "qtd": undefined, //se não passar ele pega tudo, acho que pode ser assim pra não dar muito trabalho e tal   
    //         }),
    //         success: (ans) => { this.serverAns = ans; },
    //         error: (err) => { this.serverAns = err.responseJSON },
    //         complete: () => {
    //             console.log('exemplo de getWallet -> ' ,this.serverAns.data);
    //             this.setState({listaWallet: serverAns.data});
    //         }
    //     });
    // }

    getAllPlayers(){
        let serverAns = {};
        $.ajax({
            url: '/players/getAllPlayers',
            dataType: 'json',
            type: 'post',
            contentType: 'application/json',
            success: (ans) => { serverAns = ans; },
            error: (err) => { serverAns = err.responseJSON },
            complete: () => {
               console.log('GET ALL PLAYERS -> ', serverAns);
               this.setState({listaPlayers: serverAns.data});
            }
        });
    }
    componentDidMount(){
        // this.getMyWallet();
        this.getAllPlayers();
    }

    addRegistroWallet(){
        let serverAns = {};
        let dados = {
            idPlatform:1, //pegar,
            idPlayer: 2, //pegar do state select,
            price :2500 //pegar do input
        }
        $.ajax({
            url: '/user/addDataOnWallet',
            dataType: 'json',
            type: 'post',
            data: JSON.stringify(dados),
            contentType: 'application/json',
            success: (ans) => { serverAns = ans; },
            error: (err) => { serverAns = err.responseJSON },
            complete: () => {
               console.log('GET ALL PLAYERS -> ', serverAns);
            }
        });
    }

    deleteDataWallet(){
        let serverAns = {};
        let dados = {
            "idBuy": 1, //pegar da linha que ele escolheu editar, tu recebeu essa info no getMyWallet ali em cima
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
            }
        });
    }
    // usar o price e o last price nessa função
    getPercentagem(price,priceReference){
        return parseFloat((((price / priceReference) - 1) * 100).toFixed(2))
    }
    
    //ordem:
    // 1 - chamar a user/getWallet
    // 2 - chamar a getLast price <- vou fazer
    // 3 - fazer um for calculo da porcentagem usando o UserPrice e lastPrice (ja tenho pronta, só falta saparar),
    // por enquanto faz uma fake que divide o valor em 2, só para fi
    render(){
        console.log('Wallet render' );
        // this.getMyWallet()
        return(
            // campos da tabela = jogador , preço pago, preço atual variação
            <React.Fragment>
                <PageNavigation></PageNavigation>
                <button onClick={()=>this.addRegistroWallet()}>ADICIONAR REGISTRO</button>
                Selecione um jogador:
                <ChoicePlayer listaPlayers={this.state.listaPlayers}></ChoicePlayer>
                Preço pago:
                <input></input>
                <PlayersTable lista={this.state.lista} tela="carteira"></PlayersTable>
            </React.Fragment>
        )
    }
}
export default Wallet;