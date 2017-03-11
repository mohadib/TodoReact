import React, {Component }  from 'react';
import { TodoActions } from '../actions/ActionTypes';
import { connect } from 'react-redux';

class Todo extends Component
{
   show()
   {
      this.props.dispatch({ type: TodoActions.SELECTED, payload: this.props.todo });
   }

   getClasses()
   {
      let classes = "col-xs-12 widget todo";
      if( this.props.todo.done )
      {
         classes = classes + " done";
      }
      return classes;
   }

   getDescription()
   {
      if( this.props.todo.description.length > 30 )
      {
         return `${this.props.todo.description.substring(0,30)}....`;
      }
      return this.props.todo.description;
   }

   render()
   {
      return(
         <div className={ this.getClasses() } >
            <div className="widget-title col-xs-12" style={{paddingLeft:'0px'}}>
               <div className="col-xs-11 text-left" onClick={this.show.bind(this)}>
                  {this.props.todo.title}
               </div>
               <div className="col-xs-1 text-right" style={{paddingRight:'0px'}}>
                  <p className="glyphicon glyphicon-remove" onClick={()=> this.props.deleteTodo(this.props.todo)}/>
               </div>
            </div>
            <div className="widget-body" style={{color:'#6C6C6C'}} onClick={this.show.bind(this)}>
               { this.getDescription() }
            </div>
         </div>
      );
   }
}


export default connect()(Todo)