import './Login.css';
import * as React from "react"

interface LoginProps {

}
interface LoginState {

}

export default class Login extends React.Component<LoginProps, LoginState>{
  constructor(props: LoginProps){
    super(props)
    this.state = {

    }
  }
  render(){
    return (
      <div className="login-form">
        <h1>Login required</h1>
        <form action="auth" method="POST">
          <input type="text" name="username" placeholder="Username" required />
          <input type="password" name="password" placeholder="Password" required />
          <input type="submit" />
        </form>
      </div>
    )
  }
} 