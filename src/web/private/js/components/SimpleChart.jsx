import React, {Component} from 'react';
import echarts from 'echarts';

class Market extends React.Component{
    componentDidMount(){
        let myCharts = echarts.init(document.getElementById(this.props.chartId));
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
                <div className="chart-object" id={this.props.chartId} style={{flex:1}}>
                </div>

                {/* {
                    window.onresize = function () {
                        $(".chart-object").each(function () {
                            var id = $(this).attr('_echarts_instance_');
                            if (window.echarts.getInstanceById(id)) {
                                window.echarts.getInstanceById(id).resize();
                            }
                        });
                    }
                } */}
            </React.Fragment>
        )
    }
}
export default Market;