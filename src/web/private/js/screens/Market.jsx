import React, {Component} from 'react';
import SimpleChart from '../components/SimpleChart.jsx';
import PageNavigation from '../components/PageNavigation.jsx';
import PlayersTable from '../components/PlayersTable.jsx';

class Market extends React.Component{
    constructor() {
        super();    
        this.state = {lista : [{
            player: {
                number: '1',
                name: 'Ronaldinho Gaúcho',
                actualPrice: '$1440',
                smallerPrice: '$1300',
                biggerPrice: '$2000',
                variation: '-10%',
                img: 'https://www.pinclipart.com/picdir/middle/46-469601_feet-clipart-soccer-bola-de-futebol-desenho-png.png',
                chartId: '11'
            }
        }, 
        {
            player: {
                number: '2',
                name: 'Messi',
                actualPrice: '$1440',
                smallerPrice: '$1300',
                biggerPrice: '$2000',
                variation: '-10%',
                img: 'https://www.pinclipart.com/picdir/middle/46-469601_feet-clipart-soccer-bola-de-futebol-desenho-png.png',
                chartId: '22'
            }
        },
        {
            player: {
                number: '3',
                name: 'Ronaldo Fenômeno',
                actualPrice: '$1440',
                smallerPrice: '$1300',
                biggerPrice: '$2000',
                variation: '-10%',
                img: 'https://www.pinclipart.com/picdir/middle/46-469601_feet-clipart-soccer-bola-de-futebol-desenho-png.png',
                chartId: '33'
            }
        },
        {
            player: {
                number: '4',
                name: 'Cristiano Ronaldo',
                actualPrice: '$1440',
                smallerPrice: '$1300',
                biggerPrice: '$2000',
                variation: '-10%',
                img: 'https://www.pinclipart.com/picdir/middle/46-469601_feet-clipart-soccer-bola-de-futebol-desenho-png.png',
                chartId: '44'
            }
        },
        {
            player: {
                number: '5',
                name: 'Não sei mais nomes',
                actualPrice: '$1440',
                smallerPrice: '$1300',
                biggerPrice: '$2000',
                variation: '-10%',
                img: 'https://www.pinclipart.com/picdir/middle/46-469601_feet-clipart-soccer-bola-de-futebol-desenho-png.png',
                chartId: '55'
            }
        },
        {
            player: {
                number: '6',
                name: 'Presunto',
                actualPrice: '$1440',
                smallerPrice: '$1300',
                biggerPrice: '$2000',
                variation: '-10%',
                img: 'https://www.pinclipart.com/picdir/middle/46-469601_feet-clipart-soccer-bola-de-futebol-desenho-png.png',
                chartId: '66'
            }
        }
        ]};    
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
                "qtd":"5"   
            }),
            success: (ans) => { this.serverAns = ans; },
            error: (err) => { this.serverAns = err.responseJSON },
            complete: () => {
                console.log('COMPLET ', this.serverAns);
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
        return(
            <React.Fragment>
                <PageNavigation></PageNavigation>
                <PlayersTable lista={this.state.lista}></PlayersTable>
            </React.Fragment>
        )
    }
}
export default Market;