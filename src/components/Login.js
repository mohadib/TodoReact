import React, {Component} from 'react';
import {connect} from 'react-redux'
import { FormGroup, FormControl,  ControlLabel, Button } from 'react-bootstrap';
import { loginAction } from '../services/SessionService';

class Login extends Component
{

   constructor(props)
   {
      super(props);
      this.badLogin = this.badLogin.bind(this);
   }

   componentDidMount()
   {
      document.getElementById('email').focus();
   }

   login()
   {
      let username = document.getElementById('email').value;
      let password = document.getElementById('password').value;
      this.props.login( username, password);
   }

   enter( event )
   {
      if(  event.keyCode === 13 )
      {
         this.login();
      }
   }

   badLogin()
   {
      if( this.props.session.loginFailed )
      {
         return(<div>Login Failed</div>)
      }
   }

   render()
   {
      return (
         <div className="col-xs-6 widget center-both login" onKeyDown={this.enter.bind(this)}>
            <div className="widget-title">Login</div>
            <div className="widget-body">
               <FormGroup controlId="email">
                  <ControlLabel>Email</ControlLabel>
                  <FormControl type="email" placeholder="Email Address"/>
               </FormGroup>

               <FormGroup controlId="password">
                  <ControlLabel>Password</ControlLabel>
                  <FormControl type="password" placeholder="Password"/>
               </FormGroup>

               <Button onClick={this.login.bind(this)}>Login</Button>
            </div>
            { this.badLogin() }
         </div>
      )
   }
}

function mapStateToProps( state )
{
   return {
      session: state.session
   }
}

function mapDispatchToProps( dispatch, state )
{
   return {
      login: loginAction(dispatch)
   }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)