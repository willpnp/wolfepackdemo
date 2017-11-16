import React, { Component } from 'react';
import './App.css';
import LoginScreen from './Loginscreen';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import EnhancedTable from './lib/index.js';

class TableScreen extends Component {
  constructor(props){
    super(props);
  }
  
  handleLogout(event){
    var loginPage =[];
    loginPage.push(<LoginScreen appContext={this.props.appContext}/>);
    this.props.appContext.setState({loginPage:loginPage,TableScreen:[]})
  }
  
  render() {
    return (
      <div className="App">
		<div>
		<EnhancedTable />
		</div>
	  </div>
    );
  }
}

const style = {
  margin: 15,
};

export default TableScreen;