import Role from './Role'

class User
{
   constructor( data )
   {
      this.id = data.id;
      this.email = data.email;
      this.fname = data.fname;
      this.lname = data.lname;
      this.roles = data.roles.map( (role)=> new Role( role ) );
   }
}

export default User;