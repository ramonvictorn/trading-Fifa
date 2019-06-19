import React, {Component} from 'react';
import {
    BrowserRouter as Router, 
    Route, 
    Switch,
    Redirect
} from 'react-router-dom';
class FormLogin extends Component{
    constructor({history}){
        super()
        this.login =this.login.bind(this);
        this.updateStateLogin = this.updateStateLogin.bind(this);
        this.updateStatePassword = this.updateStatePassword.bind(this);
        this.state = {
            login : '',
            password : '',
        }
        this.oi = true;
    }
    updateStateLogin(event){
        this.setState({
            login: event.target.value
          });
    }
    updateStatePassword(event){
        this.setState({
            password: event.target.value
          });
    }
    login(){
        let serverAns = {};
        let data = {
            login: this.state.login,
            password: this.state.password,
        }
        $.ajax({
            url: '/login',
            dataType: 'json',
            type: 'post',
            contentType: 'application/json',
            data: JSON.stringify(data),
            success: (ans) => { serverAns = ans; },
            error: (err) => { serverAns = err.responseJSON },
            complete: () => {
                console.log('COMPLET ', serverAns);    
                if(serverAns.data){
                    this.props.callback(true);
                }else{
                    this.props.callback(false);
                }
            }
        });
    }
    render(){
        return(
            <React.Fragment>
                <div className="form">
                    {/* <div className="register-form">
                        <input type="text" placeholder="name"></input>
                        <input type="password" placeholder="password"></input>
                        <input type="text" placeholder="email address"></input>
                        <button>create</button>
                    <p className="message">Already registered? <a href="#">Sign In</a></p>
                    </div> */}
                    <div className="login-form">
                        <input type="text" placeholder="email" value={this.state.email} onChange={this.updateStateLogin}></input>
                        <input type="password" placeholder="password" value={this.state.password} onChange={this.updateStatePassword}></input>
                        <button onClick={this.login}>login</button>
                        {/* <p className="message">Not registered? <a href="#">Create an account</a></p> */}
                    </div>
                </div>
            </React.Fragment>
        )
    }

}

export default FormLogin;