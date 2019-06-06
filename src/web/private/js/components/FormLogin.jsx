import React, {Component} from 'react';


class FormLogin extends Component{
    constructor(){
        super()
    }
    render(){
        return(
            <React.Fragment>
                <div class="form">
                    <form class="register-form">
                        <input type="text" placeholder="name"></input>
                        <input type="password" placeholder="password"></input>
                        <input type="text" placeholder="email address"></input>
                        <button>create</button>
                    <p class="message">Already registered? <a href="#">Sign In</a></p>
                    </form>
                    <form class="login-form">
                        <input type="text" placeholder="username"></input>
                        <input type="password" placeholder="password"></input>
                        <button>login</button>
                        <p class="message">Not registered? <a href="#">Create an account</a></p>
                    </form>
                </div>
            </React.Fragment>
        )
    }

}

export default FormLogin;