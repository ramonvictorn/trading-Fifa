import React, {Component} from 'react';

//require components
import FormLogin from '../components/FormLogin.jsx';

class Login extends Component{
    constructor(){
        super()
    }
    render(){
        return(
            <React.Fragment>
                Aqui é o login screen ds
                <FormLogin></FormLogin>
            </React.Fragment>
        )
    }

}

export default Login;