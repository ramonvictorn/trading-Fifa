import React, {Component} from 'react';
import echarts from 'echarts';

class Market extends React.Component{
    componentDidMount(){
        let myCharts = echarts.init(document.getElementById(this.props.chartId));
        this.renderChart();
        window.addEventListener("resize", this.updateDimensions.bind(this));

        // console.log(this.props.renderChart)
        // if(this.props.renderChart == 'teste')  {
        //     console.log('teste')
        // }

    }

    componentWillReceiveProps(newProps) {
        const oldProps = this.props
        if(oldProps.renderChart !== newProps.renderChart) {
          setTimeout(() => {
            this.chart.resize();
          }, 500);
        }
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
                xAxis: {
                    type: 'category',
                    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
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
                        rotate: 40
                    }
                },
                yAxis: {
                    type: 'value',
                    splitLine: {
                        show: false
                    },
                    axisLabel: {
                        color: 'white',
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
                    data: [820, 932, 901, 934, 1290, 1330, 1320],
                    type: 'line' ,
                    areaStyle: {}
                }]
            });
            this.chart = myChart;
        }
    }
    render(){
        return(
            <React.Fragment>
                <div className="chart-object" id={this.props.chartId} style={{flex:1}}>
                </div>
            </React.Fragment>
        )
    }
}
export default Market;