import User from './User'

class LoginResponse
{

   constructor(data)
   {
      this.success = data.success;
      this.message = data.message;

      if (this.success)
      {
         this.user = new User(data.user);
      }
   }
}

export default LoginResponse;