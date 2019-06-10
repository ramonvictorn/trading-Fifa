import React, {Component} from 'react';

import FormLogin from '../components/FormLogin.jsx';

class Login extends Component{
    constructor({history}){
        super();
    }
    
    render(){
        console.log("render Login view",history.ps ) 
        return(
            <React.Fragment>
                <div className="general-login">
                    <button onClick={()=>{this.props.history.push("/ramon");}}>teste</button>
                    <FormLogin></FormLogin>
                </div>
            </React.Fragment>
        )
    }

}

export default Login;