import React, { Component } from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import './App.css';
import Loginscreen from './Loginscreen';
import TableScreen from './TableScreen';
import ReactGA from 'react-ga';
injectTapEventPlugin();
ReactGA.initialize('UA-110269613-1');
ReactGA.pageview(window.location.pathname + window.location.search);

class App extends Component {
  constructor(props){
	super(props);
	this.state={
      loginPage:[],
      uploadScreen:[]
	}  		
  }
  
  componentWillMount(){
    var loginPage = [];
	loginPage.push(<Loginscreen parentContext={this}/>);
	this.setState({
	  loginPage:loginPage
	})
  }
  
  render() {
    return (
      <div className="App">
		{this.state.loginPage}
		{this.state.TableScreen}
      </div>
    );
  }
}

const style = {
  margin: 15,
};

export default App;
