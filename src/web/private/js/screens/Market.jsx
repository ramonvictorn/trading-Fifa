import React, {Component} from 'react';
import SimpleChart from '../components/SimpleChart.jsx';
import PageNavigation from '../components/PageNavigation.jsx';

class Market extends React.Component{
    render(){
        return(
            <React.Fragment>
                <PageNavigation></PageNavigation>
                <SimpleChart></SimpleChart>
            </React.Fragment>
        )
    }
}
export default Market;