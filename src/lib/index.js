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

  onFilterChange = (event, cellDataKey) => {
    if (!event.target.value){
	  this.setState({
	    filteredDataList: this.data,
	  });
	}
    var filterBy = event.target.value.toString().toLowerCase();
    var size = this.data.length;
    var filteredList = [];
	for (var index = 0; index < size; index++){
	  if (cellDataKey == 'startup'){
	    var v=this.data[index][cellDataKey].text;
      } else {
		var v=this.data[index][cellDataKey];		  	
	  }
      if (v.toString().toLowerCase().indexOf(filterBy) !== -1) {
	    filteredList.push(this.data[index]);
	  }
	}
	this.setState({
	  filteredDataList: filteredList,
    });
  }

  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = 'desc';

    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc';
    }

    const data =
      order === 'desc'
        ? this.state.data.sort((a, b) => (b[orderBy] < a[orderBy] ? -1 : 1))
        : this.state.data.sort((a, b) => (a[orderBy] < b[orderBy] ? -1 : 1));

    this.setState({ data, order, orderBy });
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  tableHeader(label, cellDataKey){
  	return (
      <TableHeaderColumn>
        {label}
        <div>
          <br />
          <TextField onChange = {(event,cellDataKey) => this.onFilterChange(event, cellDataKey)} />
        </div>
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
		  <div>
		  </div>
          <div>
            <Table selectable={false}>
	          <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
	            <TableRow>
                  <TableHeaderColumn>
                    Batch
                    <div>
                      <br />
                      <TextField onChange = {(event) => this.onFilterChange(event, "batch")} />
                    </div>
                  </TableHeaderColumn>
                  <TableHeaderColumn>
                    Startup
                    <div>
                      <br />
                      <TextField onChange = {(event) => this.onFilterChange(event, "startup")} />
                    </div>
                  </TableHeaderColumn>
                  <TableHeaderColumn>
                    Description
                    <div>
                      <br />
                      <TextField onChange = {(event) => this.onFilterChange(event, "description")} />
                    </div>
                  </TableHeaderColumn>
	            </TableRow>
	          </TableHeader>
              <TableBody displayRowCheckbox={false}>
                {this.state.filteredDataList.map(n => {
                  return (
                    <TableRow
                      tabIndex={-1}
                    >
                      <TableRowColumn padding="none">{n.batch}</TableRowColumn>
					  {this.tableRowColumnLink(n.startup)}
                      <TableRowColumn style={{
                        whiteSpace: "normal",
                        wordWrap: "break-word"
                      }}>
					    {n.description}
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