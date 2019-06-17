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
                img: 'https://www.elikafestas.com.br/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/i/m/imagemdoitem_119.jpg',
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
                img: 'https://www.elikafestas.com.br/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/i/m/imagemdoitem_119.jpg',
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
                img: 'https://www.elikafestas.com.br/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/i/m/imagemdoitem_119.jpg',
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
                img: 'https://www.elikafestas.com.br/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/i/m/imagemdoitem_119.jpg',
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
                img: 'https://www.elikafestas.com.br/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/i/m/imagemdoitem_119.jpg',
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
                img: 'https://www.elikafestas.com.br/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/i/m/imagemdoitem_119.jpg',
                chartId: '66'
            }
        }
        ]};    
    }

    componentDidMount(){  
        // $.ajax({
        //     url:"url bonitona que o presunto vai disponibilizar pra nois",
        //     dataType: 'json',
        //     success:function(resposta){    
        //         this.setState({lista:resposta});
        //     }.bind(this)
        //     } 
        // );          

        // PubSub.subscribe('',function( p, novaLista){
        //     this.setState({lista:novaLista});
        // }.bind(this));
        
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