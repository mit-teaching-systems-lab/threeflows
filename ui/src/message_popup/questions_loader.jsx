import React from 'react';
import * as Api from '../helpers/api.js';
import {allQuestions} from './questions.js';

export default React.createClass({
  displayName: 'QuestionsLoader',

  getInitialState(){
    return ({
      allQuestions: {
        currentQuestions: [],
        archivedQuestions: []
      },
      loaded: false
    });
  },

  queryDatabase(){
    Api.questionsQuery().end(this.onQuestionsReceived);
  },

  onReload(){
    this.queryDatabase();
  },

  onQuestionsReceived(err, response){
    if(err){
      this.setState({loaded: true});
      return;
    }
    //const allQuestions = JSON.parse(response.text).questions;
    //this.setState({ loaded: true, allQuestions });
    this.setState({loaded: true, allQuestions: {currentQuestions: allQuestions, archivedQuestions: []}})
  },

  render(){
    const {allQuestions, loaded} = this.state;
    return React.cloneElement(this.props.children, {
      allQuestions, loaded, onReloadQuestions: this.onReload
    });
  }
});