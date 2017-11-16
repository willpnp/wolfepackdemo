import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import axios from 'axios';
import TableScreen from './TableScreen';
import EnhancedTable from './lib/index.js';

var URI, PORT;

if (process.env.NODE_ENV == 'development'){
  URI = 'http://localhost';
  PORT = '5000';
} else {
  URI = 'http://wolfepackdemo-env.gtkmprjf2p.us-east-2.elasticbeanstalk.com';
  PORT = '';
}

class Login extends Component {
  constructor(props){
    super(props);
    this.state={
      username:'',
      password:'',
	  }
  }
  
  handleClick(event){
    var apiBaseUrl = URI+":"+PORT+"/api/";
    var self = this;
    var payload={
      "email":this.state.username,
      "password":this.state.password
    }
    axios.post(apiBaseUrl+'login', payload)
    .then(function (response) {
      if(response.data.code == 200){
        console.log("Login successfull");
        var TableScreen=[];
        TableScreen.push(<EnhancedTable parentContext={this} appContext={self.props.appContext} />)
        self.props.appContext.setState({loginPage:[],TableScreen:TableScreen})
      } else if(response.data.code == 204){
        console.log("Username password do not match");
        alert("username password do not match")
      } else {
        console.log("Username does not exist");
        alert("Username does not exist");
      }
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  
  render() {
    return (
      <div>
        <MuiThemeProvider>
          <div>
          <AppBar
             title="Login"
		     showMenuIconButton={false}
           />
           <TextField
             hintText="Enter your Email"
             floatingLabelText="Email"
             onChange = {(event,newValue) => this.setState({username:newValue})}
             />
           <br/>
             <TextField
               type="password"
               hintText="Enter your Password"
               floatingLabelText="Password"
               onChange = {(event,newValue) => this.setState({password:newValue})}
               />
             <br/>
             <RaisedButton label="Submit" primary={true} style={style} onClick={(event) => this.handleClick(event)}/>
         </div>
         </MuiThemeProvider>
      </div>
    );
  }
}

const style = {
  margin: 15,
};

export default Login;