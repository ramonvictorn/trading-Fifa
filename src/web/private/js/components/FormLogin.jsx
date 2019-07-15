import React, {Component} from 'react';
import {
    BrowserRouter as Router, 
    Route, 
    Switch,
    Redirect
} from 'react-router-dom';
import ModalAlert from './ModalAlert.jsx';

class FormLogin extends Component{
    constructor({history}){
        super()
        this.login =this.login.bind(this);
        this.updateStateLogin = this.updateStateLogin.bind(this);
        this.updateStatePassword = this.updateStatePassword.bind(this);
        this.state = {
            login : '',
            password : '',
            showModal: false,
            modalTitle: '',
            modalBody: '',
            modalStatus: '',
            blockLogin : false,
        }
        this.showModal = this.showModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.keyPress = this.keyPress.bind(this);
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
    showModal(status,title,body){
        this.setState({showModal:true});
        this.setState({modalStatus:status});
        this.setState({modalBody:body});
        this.setState({modalTitle:title});
    }
    closeModal(){
        this.setState({showModal:false});
    }
    login(){
        if(this.state.login == '' || this.state.password == ''){
            this.showModal('error','Preencha os campos corretamente', 'Por favor, preencha todos campos para fazer o login.')
            return;
        }
        this.setState({blockLogin:true});
        let serverAns = {};
        let data = {
            login: this.state.login,
            password: this.state.password,
        }
        this.showModal('loading', 'Fazendo Login..', 'Aguarde...')
        $.ajax({
            url: '/login',
            dataType: 'json',
            type: 'post',
            contentType: 'application/json',
            data: JSON.stringify(data),
            success: (ans) => { serverAns = ans; },
            error: (err) => { serverAns = err.responseJSON },
            complete: () => {
                this.setState({blockLogin:false});
                console.log('COMPLET ', serverAns);    
                if(serverAns.data){
                    this.showModal('Redirecionado', 'Fazendo Login', 'Aguarde...')
                    this.props.callback(true);
                }else{
                    // this.props.callback(false);
                    // console.log('error login ', serverAns)
                    if(serverAns.error == 'USER_NOT_FOUND'){
                        this.showModal('error','Senha/Usuário incorreto', 'Por favor, verifique suas credenciais.')

                        // this.showModal('error','Usuário não encontrado', 'Esse usuário não foi encontrado, por favor verifique se digitou corretamente.')
                        return
                    }
                    if(serverAns.error == 'PASSWORD_INVALID'){
                        this.showModal('error','Senha/Usuário incorreto', 'Por favor, verifique suas credenciais.')
                        return;
                    }
                    this.showModal('error','Ocorreu um erro', 'Por favor,Tente novamente em alguns minutos')   
                }
            }
        });
    }
    keyPress(e){
        // console.log('key press no input', e.key == 'Enter ,', e.charCode)
        if( e.key == 'Enter' || e.charCode == 13){
            this.login()
        }
    }
    
    render(){
        let modal = '';
        if(this.state.showModal == true){
            // var me = this;
            // $(document).click(function(event) {
            //     console.log('click no doc ', event.target)
            //     if (!$(event.target).closest("general-login").length){
            //         me.closeModal();
            //         // console.log('deu if ', this)
            //     }
            // })
            modal = <ModalAlert modalBody={this.state.modalBody} modalTitle={this.state.modalTitle} status={this.state.modalStatus} close={this.closeModal}></ModalAlert>
        }
        return(
            <React.Fragment>
                {modal}
                <div className="form">
                    {/* <div className="register-form">
                        <input type="text" placeholder="name"></input>
                        <input type="password" placeholder="password"></input>
                        <input type="text" placeholder="email address"></input>
                        <button>create</button>
                    <p className="message">Already registered? <a href="#">Sign In</a></p>
                    </div> */}
                    <div className="login-form">
                        <input onKeyPress={this.keyPress} type="text" disabled = {(this.state.blockLogin)? "disabled" : ""} placeholder="email" value={this.state.email} onChange={this.updateStateLogin}></input>
                        <input onKeyPress={this.keyPress} type="password" disabled = {(this.state.blockLogin)? "disabled" : ""} placeholder="password" value={this.state.password} onChange={this.updateStatePassword}></input>
                        <button onClick={this.login}>login</button>
                        {/* <p className="message">Not registered? <a href="#">Create an account</a></p> */}
                    </div>
                </div>
            </React.Fragment>
        )
    }

}

export default FormLogin;