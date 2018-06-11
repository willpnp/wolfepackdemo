import React, { Component } from 'react';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
  TableFooter,
} from 'material-ui/Table';
import Paper from 'material-ui/Paper';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Toolbar from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import TextField from 'material-ui/TextField';
import json from '../json/batch.json';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
var _ = require("lodash");
const columnData = json;

class EnhancedTable extends Component {
  constructor(props) {
    super(props);
	this.data = columnData.sort((a, b) => (a.batch < b.batch ? -1: 1));
    this.state = {
      order: 'asc',
      orderBy: 'batch',
      page: 0,
      rowsPerPage: 5,
	  filteredDataList: this.data,
    };
  };

  onFilterChange = (event) => {
    if (!event.target.value){
	  this.setState({
	    filteredDataList: this.data,
	  });
	}
    var filterBy = event.target.value.toString().toLowerCase().split(" ");
    var size = this.data.length;
    var filteredList = [];
	var dataRowString, filterMatch;
	for (var index = 0; index < size; index++){
	  dataRowString = '';
	  filterMatch = 0;
	  for (var key in this.data[index]){
		  if (this.data[index].hasOwnProperty(key)){
			  if(key == 'startup'){
		  	    var v=this.data[index][key].text;
			  } else {
		  		var v=this.data[index][key];		  	
			  }
			  dataRowString = dataRowString + v.toString().toLowerCase();
		  }
	  } 
	  for (var i=0; i<filterBy.length; i++){
	      if (dataRowString.indexOf(filterBy[i]) !== -1) {
			  filterMatch = filterMatch+1;
		  }	  	
	  }
	  if (filterMatch == filterBy.length){
	      filteredList.push(this.data[index]);	  	
	  }
	}
	this.setState({
	  filteredDataList: filteredList,
    });
  }

  tableHeader(label, cellDataKey){
  	return (
      <TableHeaderColumn>
        {label}
	  </TableHeaderColumn>  		
  	)
  }
  
  tableRowColumnLink(startup){
	var tableRowColumnText;
	if (startup.link){
		tableRowColumnText =(
		    <a href={startup.link}>{startup.text}</a>
	    )		
	} else {
		tableRowColumnText =(
		    startup.text
	    )				
	}
	return (
        <TableRowColumn>
		{tableRowColumnText}
        </TableRowColumn>  	    	
	)
  }

  render() {
    const { order, orderBy, selected, rowsPerPage, page } = this.state;
	const data = this.data;

    return (
      <MuiThemeProvider>
        <Paper>
          <TextField
			hintText="Search"
            floatingLabelText="Search"
			style={{display:'block', marginLeft:'10px'}}
			onChange = {(event) => this.onFilterChange(event)}
		  />
          <div>
            <Table selectable={false}>
	          <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
	            <TableRow>
                  <TableHeaderColumn>
                    Program
                  </TableHeaderColumn>
                  <TableHeaderColumn>
                    Batch
                  </TableHeaderColumn>
                  <TableHeaderColumn>
                    Startup
                  </TableHeaderColumn>
                  <TableHeaderColumn>
                    Description
                  </TableHeaderColumn>
                  <TableHeaderColumn>
                    Customers
                  </TableHeaderColumn>
	            </TableRow>
	          </TableHeader>
              <TableBody displayRowCheckbox={false}>
                {this.state.filteredDataList.map(n => {
                  return (
                    <TableRow
                      tabIndex={-1}
                    >
                      <TableRowColumn padding="none">{n.program}</TableRowColumn>
                      <TableRowColumn padding="none">{n.batch}</TableRowColumn>
					  {this.tableRowColumnLink(n.startup)}
                      <TableRowColumn style={{
                        whiteSpace: "normal",
                        wordWrap: "break-word"
                      }}>
					    {n.description}
					  </TableRowColumn>
                      <TableRowColumn style={{
                        whiteSpace: "normal",
                        wordWrap: "break-word"
                      }}>
					    {n.customers}
					  </TableRowColumn>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </Paper>
      </MuiThemeProvider>
    );
  }
}

export default EnhancedTable;