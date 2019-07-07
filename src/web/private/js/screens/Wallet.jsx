import React, {Component} from 'react';
import PageNavigation from '../components/PageNavigation.jsx';

class Wallet extends React.Component{
    constructor(){
        super()
    }

    getMyWallet(){
        $.ajax({
            url: '/user/getWallet',
            dataType: 'json',
            type: 'post',
            contentType: 'application/json',
            data: JSON.stringify({
                "idPlatform": 1 , //tu que passa
                "offset": undefined, // se não passa ele pegar a partir do 0
                "qtd": undefined, //se não passar ele pega tudo, acho que pode ser assim pra não dar muito trabalho e tal   
            }),
            success: (ans) => { this.serverAns = ans; },
            error: (err) => { this.serverAns = err.responseJSON },
            complete: () => {
                console.log('exemplo de getWallet -> ' ,this.serverAns.data)
            }
        });
    }

    //ordem:
    // 1 - chamar a user/getWallet
    // 2 - chamar a getLast price <- vou fazer
    // 3 - fazer um for calculo da porcentagem usando o UserPrice e lastPrice (ja tenho pronta, só falta saparar),
    // por enquanto faz uma fake que divide o valor em 2, só para fi
    render(){
        console.log('Wallet render' );
        this.getMyWallet()
        return(
            <React.Fragment>
                <PageNavigation></PageNavigation>
                <h1>Carteira</h1>
            </React.Fragment>
        )
    }
}
export default Wallet;