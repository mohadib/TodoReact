import React, {Component} from 'react';
import { connect } from 'react-redux';
import { FormGroup, ControlLabel, FormControl, Checkbox, Button, ButtonGroup } from 'react-bootstrap'
import Todo from '../domain/Todo';
import { TodoActions } from '../actions/ActionTypes';
import { todoService } from '../services/EntityServices';

class TodoCreate extends Component
{

   componentWillReceiveProps( nextProps )
   {
      console.log("tehg");

      // if we dont have a selected todo, create a new one
      if( !nextProps.selectedTodo )
      {
         this.props.createNew();
      }
   }

   componentWillMount()
   {
      if( !this.props.selectedTodo )
      {
         this.props.createNew();
      }
   }

   update( event )
   {
      let todo = new Todo( this.props.selectedTodo );

      if( event.target.type === 'text')
      {
         todo.title = event.target.value;
      }
      else if( event.target.type === 'textarea' )
      {
         todo.description = event.target.value;
      }
      else if( event.target.id === 'done')
      {
         todo.done = event.target.checked;
      }

      this.props.propertyUpdated( todo );
   }

   saveOrUpdate( event )
   {
      let that = this;
      let fn = this.props.selectedTodo.id ? this.props.update : this.props.save;

      fn(this.props.selectedTodo, function(){
         that.props.getAll( that.props.paging );
         that.props.clearSelection();
      });

      event.target.blur();
      event.preventDefault();
   }

   getTitle()
   {
      return this.props.selectedTodo.id ? "Editing Todo" : "New Todo";
   }

   validate()
   {
      return this.props.selectedTodo.title.trim().length > 0;
   }


   render()
   {
      if(!this.props.selectedTodo) return null;

      return(
         <div className="container widget todo-create" id="todoCreate">
            <div className="widget-title">{ this.getTitle() }</div>
            <div className="widget-body">

               <div onChange={this.update.bind(this)}>
                  <FormGroup controlId="title">
                     <ControlLabel>Title</ControlLabel>
                     <FormControl type="text" placeholder="Title" value={this.props.selectedTodo.title}/>
                  </FormGroup>

                  <FormGroup controlId="description">
                     <ControlLabel>Password</ControlLabel>
                     <FormControl componentClass="textarea" placeholder="Description" value={this.props.selectedTodo.description}/>
                  </FormGroup>

                  <div className="col-xs-6" style={{'padding-left':'0px'}}>
                     <div className="col-xs-3" style={{marginRight:'10px', paddingLeft:'0px'}}>
                        <FormGroup>
                           <Checkbox checked={this.props.selectedTodo.done} id="done">
                              Done
                           </Checkbox>
                        </FormGroup>
                     </div>
                  </div>
               </div>

               <div className="col-xs-6 text-right" style={{'padding-right':'0px'}}>
                  <ButtonGroup>
                     <Button onClick={this.saveOrUpdate.bind(this) } disabled={!this.validate()}>Save</Button>
                     <Button onClick={this.props.clearSelection}>Clear</Button>
                  </ButtonGroup>
               </div>
            </div>
         </div>
      )
   }
}

function mapStateToProps( state )
{
   return {
      selectedTodo: state.todos.todo,
      paging: {
         offset: state.todos.list.offset,
         limit: state.todos.list.limit,
         sort: state.todos.list.sort,
         direction: state.todos.list.direction
      }
   }
}

function mapDispatchToProps( dispatch, state )
{
   return {
      save: todoService.saveAction(dispatch ),
      update: todoService.updateAction(dispatch),
      getAll: todoService.getAll( dispatch ),
      clearSelection: (event)=> {
         if( event !== undefined )
         {
            event.target.blur();
            event.preventDefault();
         }
         dispatch({ type:TodoActions.SELECTION_CLEARED });
      },
      propertyUpdated: ( todo )=>{ dispatch({type: TodoActions.PROPERTY_UPDATED, payload:todo }) },
      createNew: () => dispatch({type: TodoActions.CREATE_NEW, payload: new Todo()})
   }
}

export default connect( mapStateToProps, mapDispatchToProps )(TodoCreate)