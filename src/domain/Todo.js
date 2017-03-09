class Todo {

   constructor( data )
   {
      data = data || {};
      this.id = data.id || null;
      this.title = data.title || '';
      this.description = data.description || '';
      this.done = data.done || false;
   }

}

export default Todo;