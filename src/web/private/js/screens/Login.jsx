import React, {Component} from 'react';

import FormLogin from '../components/FormLogin.jsx';

class Login extends Component{
    constructor(){
        super();
    }
    
    
    render(){
        console.log('render Login View', this.props);
        if(this.props.isLogged == true){
            this.props.history.push('/market')
        }
        return(
            <React.Fragment>
                <div className="general-login">
                    <FormLogin></FormLogin>
                </div>
            </React.Fragment>
        )
    }

}

export default Login;