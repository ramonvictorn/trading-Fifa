import React, {Component} from 'react';
import echarts from 'echarts';

class Market extends React.Component{
    componentDidMount(){
        let myCharts = echarts.init(document.getElementById("mycharts"));
        console.log(myCharts);
        myCharts.setOption({
            xAxis: {
                type: 'category',
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            },
            yAxis: {
                type: 'value'
            },
            series: [{
                data: [820, 932, 901, 934, 1290, 1330, 1320],
                type: 'line'
            }]
        });
    }
    render(){
        return(
            <React.Fragment>
            <h1>Simple Chart</h1>
                <div id="mycharts" style={{width:700,height:500}}>

                </div>
            </React.Fragment>
        )
    }
}
export default Market;