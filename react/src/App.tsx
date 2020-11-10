import './App.css';
import axios from "axios";
import * as React from "react";
// https://blog.logrocket.com/axios-or-fetch-api/

interface AppProps {

}
interface AppState {
  date: Date
}

export default class App extends React.Component<AppProps, AppState>{
  timerID!: NodeJS.Timeout;
  constructor(props: AppProps){
    super(props);
    this.state = {
      date: new Date()
    }
  }
  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      date: new Date()
    });
  }
  render(){
    return (
      <div className="App">
        <div className="login-form">
          <p>{this.state.date.toLocaleTimeString()}</p>
          <h1>Login required</h1>
          <form action="auth" method="POST">
            <input type="text" name="username" placeholder="Username" required />
            <input type="password" name="password" placeholder="Password" required />
            <input type="submit" />
          </form>
        </div>
      </div>
    );
  }
};