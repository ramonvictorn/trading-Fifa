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
                <img src={'/assets/fifaTeste.jpg'} style={{width:'50%'}}></img>
                Aqui é o login screen ds
                <FormLogin></FormLogin>
            </React.Fragment>
        )
    }

}

export default Login;