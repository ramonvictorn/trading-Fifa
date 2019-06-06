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
                <div class="general-login">
                    <FormLogin></FormLogin>
                </div>
            </React.Fragment>
        )
    }

}

export default Login;