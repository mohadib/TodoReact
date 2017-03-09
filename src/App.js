import React, {Component} from 'react';
import {connect} from 'react-redux'
import Login from './components/Login';
import { getCurrentUser } from './services/SessionService';
import { Nav, Navbar, NavbarBrand, NavDropdown, MenuItem, Button, FormGroup, FormControl  } from 'react-bootstrap';
import TodoList from './components/TodoList';
import TodoCreate from './components/TodoCreate';
import { clearAlert } from './services/AlertsService';
import { SearchActions } from './actions/ActionTypes';
import { todoSearchByTitleOrDescription } from './services/SearchService';

class App extends Component
{
   constructor( props )
   {
      super(props )
      this.timeout = undefined;
   }

   componentWillMount()
   {
      if( this.props.user === null )
      {
         this.props.getCurrentUser();
      }
   }

   componentDidUpdate()
   {
      let _that = this;
      if( this.props.alert )
      {
         setTimeout(function ()
         {
            document.getElementById('alert').style.opacity = "0";
            _that.timeout = setTimeout( ()=> _that.props.clearAlert(), 4000 );
         }, 500);
      }
   }

   componentWillUpdate( nextProps, nextState )
   {
      if( this.props.alert && nextProps.alert )
      {
         document.getElementById('alert').style.opacity = "0.5";
         clearTimeout(this.timeout);
      }
   }

   getAlerts()
   {
      if( !this.props.alert) return null;
      return(
         <div id="alertContainer" className="text-center">
            <div id="alert">
               {this.props.alert.msg}
            </div>
         </div>
      )
   }

   enter( event )
   {
      if(  event.keyCode === 13 )
      {
         this.props.search( event.target.value );
      }
   }

   clear()
   {
      this.props.clearSearch();
   }

    render()
    {
       if( this.props.fetching )
       {
          return <div className="center-both loading">Loading</div>
       }

       if( !this.props.user )
       {
          return ( <Login/> )
       }


       return(

         <div className="col-xs-12">
            { this.getAlerts()}

            <Navbar id="mine" fixedTop>
               <Navbar.Header>
                  <NavbarBrand>
                     <a href="#">Todo</a>
                  </NavbarBrand>
               </Navbar.Header>
               <Navbar.Form pullLeft>
                  <FormGroup>
                     <FormControl type="text" placeholder="Search" onKeyDown={ this.enter.bind(this) }/>
                  </FormGroup>
                  {' '}
                  <Button onClick={this.clear.bind(this)}>Clear</Button>
               </Navbar.Form>
               <Nav pullRight>
                  <NavDropdown title={this.props.user.email} id="navDropDown" >
                     <MenuItem>Logout</MenuItem>
                  </NavDropdown>
               </Nav>
            </Navbar>

            <div className="container" id="contentContainer">
               <div className="col-xs-6" id="todoList">
                  <TodoList/>
               </div>
               <div className="col-xs-6">
                  <TodoCreate/>
               </div>
            </div>

         </div>

       )
    }
}

function mapStateToProps( state )
{
    return {
       user: state.session.user,
       fetching: state.session.fetchingCurrentUser,
       alert: state.alerts.alert
    }
}

function mapDispatchToProps( dispatch, state )
{
    return {
       getCurrentUser: getCurrentUser( dispatch ),
       clearAlert: clearAlert( dispatch, state),
       clearSearch: ()=> {
          dispatch({ type:SearchActions.TODO_SEARCH_CLEAR })
       },
       search: todoSearchByTitleOrDescription( dispatch )
    }
}

export default connect( mapStateToProps, mapDispatchToProps )(App)