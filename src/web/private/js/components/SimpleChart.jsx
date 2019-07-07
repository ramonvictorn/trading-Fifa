import React, {Component} from 'react';
import echarts from 'echarts';
import Loader from 'react-loader-spinner';

class Market extends React.Component{
    constructor() {
        super();    
        this.state = {chartDataDay: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'], chartDataPrice: [820, 932, 901, 934, 1290, 1330, 1320]};    
    }
    componentDidMount(){
        let myCharts = echarts.init(document.getElementById(this.props.chartId));
        
        this.renderChart();
    }
    getData(){
        $.ajax({
            url: '/player/getPrices',
            dataType: 'json',
            type: 'post',
            contentType: 'application/json',
            data: JSON.stringify({
                "idPlatform": 1,
                "idPlayer": this.props.playerId,
                "month":  6 ,//OPCIONAL -> SE NÃO ENVIAR ELE USA O MÊS ATUAL
                "year": 2019,//OPCIONAL -> SE NÃO ENVIAR ELE USA O ANO ATUAL  
            }),
            success: (ans) => { this.serverAns = ans; },
            error: (err) => { this.serverAns = err.responseJSON },
            complete: () => {
                
                this.setState({dataPrices: this.serverAns.data})
                this.trueChartData();
            }
        });
    }

    trueChartData(){
        var prices = [];
        var days = [];
        console.log(this.state.dataPrices)
        this.state.dataPrices.forEach(e => {
            prices.push(e.price)
            days.push(e.day)
        });

        this.setState({chartDataDay: days, chartDataPrice: prices})
        this.renderChart();
    }

    componentWillReceiveProps(newProps) {
        const oldProps = this.props;
        if(newProps.show != oldProps.show) {
            this.getData();
            setTimeout(() => {
                this.chart.resize();
            }, 500);
        }
        setTimeout(() => {
            this.chart.resize();
        }, 500);
      }

    componentWillUnmount() {
        window.removeEventListener("resize", this.updateDimensions.bind(this));
    }

    updateDimensions(){
        this.chart.resize();
    }

    renderChart() {
        var element = document.getElementById(this.props.chartId);
        if(element){
            var myChart = echarts.init(element);
            myChart.setOption({
                color: ['#823eef'],
                tooltip : {
                    trigger: 'axis',
                    formatter: function (params) {
                        const param = params[0];
                        const value = parseFloat(param.value).toLocaleString('pt-BR');
                        const label = 'Dia: ' + param.axisValue + '<br />' + 'Mês: Julho' + '<br />' + param.marker + param.seriesName + ': R$' + value
                        return label;

                    }
                },
                xAxis: {
                    type: 'category',
                    data: this.state.chartDataDay,
                    axisTick: {
                        show: false
                    },
                    axisLine: {
                        lineStyle: {
                            color: 'white'
                        }
                    },
                    axisPointer: {
                        handle: {
                            color: 'red'
                        }
                    },
            
                    axisLabel: {
                        interval: 0,
                        rotate: 0
                    }
                },
                yAxis: {
                    type: 'value',
                    splitLine: {
                        show: false
                    },
                    axisLabel: {
                        color: 'white',
                        formatter: function (params) {
                            const value = parseFloat(params).toLocaleString('pt-BR');
                            const label = 'R$' + value
                            return label;
    
                        }
                    },
                    axisLine: {
                        lineStyle: {
                            color: 'white'
                        }
                    },
                    axisTick: {
                        show: false
                    }
                },
                series: [{
                    name: 'Preço',
                    data: this.state.chartDataPrice,
                    type: 'line' ,
                    areaStyle: {}
                }]
            });
            this.chart = myChart;
        }
    }
    render(){
        window.addEventListener("resize", this.updateDimensions.bind(this));
        var chartLoader = <div className="chart-loader"><Loader type="Triangle" color="#663ab5" height={80} width={80} /></div>
        if(this.state.dataPrices) {
            if(this.state.dataPrices.length == 0) {
                chartLoader = <div className="chart-loader"><span style={{color: 'white', fontFamily: 'monospace'}}>Reclama com o backend</span></div>;
            }
            if(this.state.dataPrices.length > 0) {
                chartLoader = '';
            }
            
        }
        return(
            <React.Fragment>
                <div className="chart-object" id={this.props.chartId} style={{flex:1}}>
                </div>
                {chartLoader}
            </React.Fragment>
        )
    }
}
export default Market;