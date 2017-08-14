import React, { Component } from 'react';
import './App.css';
import $ from 'jquery';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      receivedObj: false,
      errorMsg: false
    };
    this.handleSearch = this.handleSearch.bind(this);
    this.handleSearchObj = this.handleSearchObj.bind(this);
    this.handleErrorMsg = this.handleErrorMsg.bind(this);
    this.searchDb = this.searchDb.bind(this);
  }

  handleSearch(event) {
    this.setState({
      search: event.target.value
    });
  }

  handleSearchObj() {
    this.setState({
      receivedObj: true
    })
  }

  handleErrorMsg() {
    this.setState({
      errorMsg: true
    })
  }

  searchDb(e) {
    e.preventDefault();

    var lowerCaseSearch = this.state.search.toLowerCase();

    var data = {
      ingredient: lowerCaseSearch
    }

    $.post('/api/ingredients', {
      data: data
    })
    .done((obj) => {
      console.log('received:', obj);
      this.handleSearchObj;
    })
    .fail((str) => {
      console.log('failed:', str.responseText);
      this.handleErrorMsg;
    })

  }
  render() {
    return (
      <div>
        <div>
          <h2>Search Ingredients 20/20</h2>
        </div>

        <form onSubmit={this.searchDb}>
          <input type="text" value={this.state.search} placeholder="Search Ingredient"
              onChange={this.handleSearch}/>
          <input type="submit" value="Submit"/>
        </form>
        <div> </div>
      </div>
    );
  }
}

export default Dashboard;