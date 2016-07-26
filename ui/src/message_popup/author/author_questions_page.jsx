import React from 'react';

import * as Routes from '../../routes.js';

import TextField from 'material-ui/TextField';
import Divider from 'material-ui/Divider';
import IconButton from 'material-ui/IconButton';

import SearchIcon from 'material-ui/svg-icons/action/search';
import AddIcon from 'material-ui/svg-icons/content/add';

import NavigationAppBar from '../../components/navigation_app_bar.jsx';
import QuestionButton from './question_button.jsx';

import {allQuestions} from '../questions.js';

export default React.createClass({
  displayName: 'AuthorQuestionsPage',
  
  onNewQuestion(){
    Routes.navigate(Routes.messagePopupAuthorQuestionsNewPath());
  },

  render(){
    return(
      <div>
        <NavigationAppBar
          title="MP Questions"
          iconElementRight={<IconButton onTouchTap={this.onNewQuestion}><AddIcon /></IconButton>}
          />
        <div style={styles.container}>
          <div style={styles.searchbar}>
            <SearchIcon />
            <TextField
              hintText="Search for a specific question"
              fullWidth={true}
              style={styles.searchbarText}
              underlineShow={false}
            />
          </div>
          <Divider />
          <div style={styles.questionsContainer}>
            {allQuestions.map(question => {
              return (
               <QuestionButton question={question} key={question.id} />
               );
            })}
          </div>
        </div>
      </div>
      );
  }
});

const styles = {
  container: {
    padding: 0
  },
  searchbar: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  searchbarText: {
    paddingLeft: 10,
    paddingRight: 5
  },
  questionsContainer: {
    position: 'absolute',
    top: 112,
    bottom: 0,
    overflowY: 'scroll'
  }
};