import React, {Component} from 'react';

import FormLogin from '../components/FormLogin.jsx';

class Login extends Component{
    constructor(){
        super();
        this.setLogged = this.setLogged.bind(this);
    }
     
    setLogged(boll){
        this.props.cbSetState(boll);
    }
    
    render(){
        if(this.props.isLogged == true){
            this.props.history.push('/Mercado')
        }
        return(
            <React.Fragment>
                <div className="general-login">
                    <FormLogin callback={this.setLogged}></FormLogin>
                </div>
            </React.Fragment>
        )
    }

}

export default Login;