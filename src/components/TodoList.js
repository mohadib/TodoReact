import React, {Component} from 'react';

import {connect} from 'react-redux'
import Todo from './Todo';
import {todoService} from '../services/EntityServices';

class TodoList extends Component
{

   componentWillMount()
   {
      this.props.getTodos({ direction: 'asc' });
   }

   changePage( event )
   {
      //TODO make this page through search results...

      let pageNum = event.target.getAttribute('data');
      this.props.getTodos({ offset: parseInt( pageNum ) });
      window.scrollTo(0,0);
      event.preventDefault();
   }

   getPagination()
   {

      if( this.props.totalPages < 2 ) return null;

      let pages = [], uls = [];

      pages.push( { offset: this.props.offset - 1,  text: 'Previous', disabled: this.props.offset === 0 } );
      for( let i = 0; i < this.props.totalPages; i++)
      {
         pages.push( { offset: i, text: i+1 });
      }
      pages.push( { offset: this.props.offset + 1,  text: 'Next', disabled:this.props.offset + 1 === this.props.totalPages } );

      for( let i = 0; i < pages.length; i++)
      {
         let page = pages[i];
         let cname = 'none', click = this.changePage.bind(this);
         if( page.disabled )
         {
            cname = 'disabled';
            click = ()=>{};
         }
         if( this.props.offset  === page.offset )
         {
            cname = 'active';
            click = ()=>{};
         }
         uls.push(
            <li key={i} className={cname}><a href="javascript:" onClick={click} data={page.offset}>{page.text}</a></li>
         )
      }

      return(
         <ul className="pagination">
            { uls }
         </ul>
      );
   }

   render()
   {
      if( this.props.todos.length === 0 )
      {
         return( <div>No todos </div>);
      }

      return(
         <div>
            <ul id="todo-ul">
               { this.props.todos.map( ( todo )=>{
                  return (
                     <li key={todo.id}>
                        <Todo todo={todo}/>
                     </li>
                  )
               } ) }
            </ul>
            { this.getPagination() }
         </div>
      )
   }
}

function mapStateToProps( state )
{
   return {
      todos: (()=>{
         if( state.searchTodos.list.todos.length > 0  )
         {
            return state.searchTodos.list.todos
         }
         return state.todos.list.todos
      })(),
      total: state.todos.list.total,
      offset: state.todos.list.offset,
      limit: state.todos.list.limit,
      sort: state.todos.list.sort,
      direction: state.todos.list.direction,
      totalPages: (()=>{
         let totalPages = Math.floor( state.todos.list.total / state.todos.list.limit );
         if( state.todos.list.total % state.todos.list.limit !== 0 ) totalPages++;
         return totalPages;
      })()
   }
}

function mapDispatchToProps( dispatch, state )
{
   return {
      getTodos: todoService.getAll(dispatch)
   }
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoList)