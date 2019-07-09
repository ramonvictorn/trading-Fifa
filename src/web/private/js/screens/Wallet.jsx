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
        let id = document.getElementById("testeselect").value;
        let price = document.getElementById("priceplayer").value;
        let plataforma = document.getElementById("Plataforma").value;

        if(id && plataforma && price) {
            let serverAns = {};
            let dados = {
                idPlatform: plataforma, //pegar,
                idPlayer: id, //pegar do state select,
                price : price //pegar do input
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
        } else {
            if(!id) {
                alert("Selecione um jogador!")
            } else if(!price) {
                alert("Adicione um preço!")
            }  else if(!plataforma) {
                alert("Selecione a plataforma!")
            }
        }
        
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
        let optionSelect = [];
        let arrayData = this.state.listaPlayers || [];
        let players = arrayData.map((ele,index)=>{
            optionSelect.push(<option className="opt" key={index} value={ele.idPlayer}>{ele.name}</option>)
        })
        return(
            // campos da tabela = jogador , preço pago, preço atual variação
            <React.Fragment>
                <PageNavigation cbSetState={this.props.cbSetState}></PageNavigation>
                <div className="add-player">
                    <button onClick={()=>this.addRegistroWallet()}>ADICIONAR REGISTRO</button>
                    <span className="add-player-span">Selecione um jogador:</span>
                    <select id="testeselect" className="drop" name="choicePlayer">
                        {optionSelect}
                    </select>
                    <span className="add-player-span">Selecione a plataforma:</span>
                    <select id="Plataforma" className="drop" name="choicePlayer">
                        <option value="1">XBOX</option>
                        <option value="2">PS4</option>
                        <option value="3">PC</option>
                    </select>
                    <span className="add-player-span">Preço pago:</span>
                    <input id="priceplayer" className="input-custom" type="number"></input>
                </div>
                
                <PlayersTable lista={this.state.lista} tela="carteira"></PlayersTable>
            </React.Fragment>
        )
    }
}
export default Wallet;