import React, { Component, PropTypes } from 'react';

// Texteditor component - represents a texteditor that the user can use for
//notetaking

export default class TextEdit extends Component {
  constructor(props) {
    super(props);
    var notetexttemp = this.props.temptext;
    this.state = {value: notetexttemp, tempnotetext: this.props.temptext};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.enterSubmit = this.enterSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    Meteor.call('notes.update', this.props.noteidentity, this.state.value);
  }


  enterSubmit(e) {
    e = e || event;

    if (e.shiftKey && e.keyCode === 13) {
	this.setState({value: event.target.value});
    }
    else if (e.keyCode === 13 && !e.ctrlKey) {

      if(this.state.value.length <= 0) {
	console.log("hello");
	Meteor.call('notes.remove',this.props.noteidentity);
      }
      else {
      Meteor.call('notes.update', this.props.noteidentity, this.state.value);

      }
    }
  }
  compareDates() {
	var comparedate = new Date();
	if ((comparedate.getTime() - this.props.datecreated.getTime()) < 3000) {
	  return (true);
	}
	else {
	  return (false);
	}
  }

  render() {
    return (

          <textarea autoFocus id="noteEditor" name="message" rows="3" cols="30"
            placeholder={ this.compareDates.bind(this) ?
		"Add some text" : this.props.temptext          }
	    value={this.state.value}
            onChange={this.handleChange}
	    onKeyDown={this.enterSubmit }></textarea>

    );
  }
}
