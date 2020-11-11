import axios from "axios";
import * as React from "react";

import Login from "./Login";
import Desktop from "./Desktop";

interface AppProps {}
interface AppState {
  authorised: boolean
}

export default class App extends React.Component<AppProps, AppState>{
  constructor(props: AppProps){
    super(props);
    this.state = {
      authorised: false
    }
  }

  auth(e?: any ){
    // https://blog.logrocket.com/axios-or-fetch-api/
    axios({
      method: 'post',
      url: '/auth',
      timeout: 4000,    // 4 seconds timeout
      data: {
      }
    })
    .then(response => {
      this.setState({
          authorised: response.data
      })
      console.log("set: " + response.data);
    })
    .catch(error => console.error('timeout exceeded'))
    
  }

  componentDidMount() {
    this.auth()
  }

  render(){
    return (
      <div className="App">
        {this.state.authorised?<Desktop />:<Login />}
      </div>
    );
  }
};