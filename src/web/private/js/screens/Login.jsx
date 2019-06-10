import React, {Component} from 'react';

import FormLogin from '../components/FormLogin.jsx';

class Login extends Component{
    constructor({history}){
        super();
    }
    
    render(){
        
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