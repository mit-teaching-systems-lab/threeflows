import React from 'react';
import NavigationAppBar from '../../components/navigation_app_bar.jsx';


export default React.createClass({
  displayName: 'ArchivedQuestionsPage',

  render(){
    return (
      <div>
        <NavigationAppBar
          title="MP Archived Questions"
          />

      </div>
      );
  }
});