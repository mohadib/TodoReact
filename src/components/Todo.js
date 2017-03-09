import React, {Component} from 'react';
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

   render()
   {
      return(
         <div className={ this.getClasses() } onClick={this.show.bind(this)}>
            <div className="widget-title">
                  {this.props.todo.title}
            </div>
            <div className="widget-body">
               {this.props.todo.description}
            </div>
         </div>
      );
   }
}


export default connect()(Todo)