import React from "react";

module.exports = React.createClass({
  getInitialState: function () {
    return {
      query: '',
      status: '',
      generator: ''
    };
  },
  handleChange: function(e) {
    let query = e.target.value;
    if (query === this.state.query) {
      return;
    }
    this.state.query = query;
    this.search();
  },
  handleGenerator: function(e) {
    let generator = e.target.value;
    if (generator === this.state.generator) {
      return;
    }
    this.state.generator = generator;
    this.search();
  },
  handleStatus: function(status) {
    if (status === this.state.status) {
      return;
    }
    this.state.status = status;
    this.search();
  },
  search:function(){
    this.props.filterUpdate(this.state);
  },
  render:function(){
      return (
        <div className="searchbar">
          <input className="searchbar-edit" type="text" ref="searchInput"
            placeholder="Search Name" value={this.props.query}
            onChange={this.handleChange}/>
          <input className="searchbar-edit" type="text" ref="searchInput"
            placeholder="Generator Version Name" value={this.props.generator}
            onChange={this.handleGenerator}/>
          <div className="searchbar-filter">
            <div><input type="radio" name="myRadioInput" onChange={this.handleStatus.bind(null, 'None')}/> None</div>
            <div><input type="radio" name="myRadioInput" onChange={this.handleStatus.bind(null, 'Failed')} /> Failed</div>
            <div><input type="radio" name="myRadioInput" onChange={this.handleStatus.bind(null, 'Pending')} /> Pending</div>
            <div><input type="radio" name="myRadioInput" onChange={this.handleStatus.bind(null, 'Done')} /> Done</div>
          </div>
        </div>
      )
  }
});
