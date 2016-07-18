/* @flow weak */
import React from 'react';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import * as Colors from 'material-ui/styles/colors';
import * as PropTypes from '../prop_types.js';
import ChallengeCard from './challenge_card.jsx';
import NavigationAppBar from '../components/navigation_app_bar.jsx';



/*
Home navigation page, for navigating between ECD pieces,
particular learning experiences, and prototypes of WWA program elements.
*/
export default React.createClass({
  displayName: 'HomePage',

  propTypes: {
    challenges: React.PropTypes.arrayOf(PropTypes.Challenge).isRequired
  },

  contextTypes: {
    auth: React.PropTypes.object.isRequired
  },

  render() {
    return (
      <div>
        <NavigationAppBar
          title="threeflows"
          style={{backgroundColor: Colors.blueGrey500}} />
        <Card style={styles.card}>
          <CardHeader
            titleStyle={styles.cardTitleHeader}
            title="Challenge prototypes"/>
          <CardText>
            {this.props.challenges.map((challenge) => {
              return <ChallengeCard key="{challenge.id}" {...challenge} style={{ border: 'none', padding: 0 }} />;
            })}
          </CardText>
        </Card>
      </div>
    );
  }
});

const styles = {
  card: {
    margin: 0
  },
  cardTitleHeader: {
    fontSize: 24
  }
};