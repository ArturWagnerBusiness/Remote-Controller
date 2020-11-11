import * as React from "react"
import axios from "axios";
import FormControl from '@material-ui/core/FormControl';
import { makeStyles, InputLabel, Input, InputAdornment } from "@material-ui/core";

interface DesktopProps {}
interface DesktopState {
  connection: boolean,
  commandline: string
}

export default class Desktop extends React.Component<DesktopProps, DesktopState>{
  pinger!: NodeJS.Timeout;
  classes: any;
  
  constructor(props: DesktopProps){
    super(props);
    this.classes = makeStyles((theme) => ({
      root: {
        display: 'flex',
        flexWrap: 'wrap',
      },
      margin: {
        margin: theme.spacing(1),
      },
      withoutLabel: {
        marginTop: theme.spacing(3),
      },
      textField: {
        width: '25ch',
      },
    }));
    this.state = {
      connection: true,
      commandline: ''
    }
  }

  ping(){
    // https://blog.logrocket.com/axios-or-fetch-api/
    axios({
      method: 'post',
      url: '/ping',
      timeout: 5000,
      data: {}
    })
    .then(response => {this.setState({connection: true})})
    .catch(error => {this.setState({connection: false})})
  }

  componentDidMount(){
    this.pinger = setInterval(()=>{
      this.ping();
    }, 5000)
  }
  componentWillUnmount(){
    clearInterval(this.pinger);
  }

  render(){
    return (
      <div className="Desktop">
        <h1>Connection {this.state.connection?'online':'offline'}</h1>
        <FormControl fullWidth className={this.classes.margin}>
          <InputLabel htmlFor="standard-adornment-amount">Amount</InputLabel>
          <Input
            id="standard-adornment-amount"
            value={this.state.commandline}
            onChange={(event)=>{
              this.setState({commandline: event.target.value })
            }}
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
          />
        </FormControl>
        <p>Your text is {this.state.commandline}</p>
      </div>
    )
  }
} 