/* @flow weak */
import React from 'react';
import _ from 'lodash';

import * as Api from '../../helpers/api.js';
import Paper from 'material-ui/Paper';
import {Card, CardTitle, CardText} from 'material-ui/Card';


// For reviewing responses as a group.
export default React.createClass({
  displayName: 'HMTCAGroupReview',

  propTypes: {
    applesKey: React.PropTypes.string
  },

  getInitialState() {
    return {
      hasLoaded: false,
      applesResponses: null
    };
  },

  // This is where we could add a timer using setInterval to repeatedly call the
  // method that refreshes the responses (and then add a componentWillUnmount to cleanup).
  componentDidMount() {
    this.refreshResponses();
  },

  refreshResponses() {
    const {applesKey} = this.props;
    Api.getApples(applesKey).end(this.onResponsesReceived);
  },

  onResponsesReceived(err, response){
    if (err){
      this.setState({ hasLoaded: true });
      return;
    }
    const applesResponses = JSON.parse(response.text);
    this.setState({ hasLoaded: true, applesResponses });
  },

  render() {
    const {hasLoaded, applesResponses} = this.state;
    if (!hasLoaded) return <div>Loading...</div>;

    // Use scene number for ordering, but then just number then naturally
    const sceneToResponses = _.groupBy(applesResponses, 'scene_number');
    return (
      <div>
        <div style={styles.instructions}>Scroll through and play!</div>
        <div>{_.sortBy(Object.keys(sceneToResponses)).map((sceneNumber, index) => {
          if (sceneNumber === 'null') return;
          return (
            <div key={sceneNumber}>
              <Card>
                <CardTitle
                  title={`Scene #${index + 1}`}
                  subtitle={sceneToResponses[sceneNumber][0]['scene_text']}
                />
                <CardText>
              <div style={styles.cardContainer}>
                {_.uniq(_.map(sceneToResponses[sceneNumber], 'anonymized_text')).map(anonymizedText => 
                  <Paper
                    key={anonymizedText}
                    style={styles.responseCard}
                    zDepth={3}>{anonymizedText}</Paper>
                )}
              </div>
              </CardText>
              </Card>
            </div>
          );
        })}</div>
      </div>
    );
  }
});

const styles = {
  instructions: {
    fontSize: 18,
    marginLeft: 15,
    marginTop: 30,
    marginBottom: 30
  },
  cardContainer: {
    display: 'flex',
    flexDirection: 'column'
  },
  responseCard: {
    minHeight: 200,
    flex: 1,
    textAlign: 'left',
    marginBottom: 15,
    marginTop: 15,
    padding: 15,
    display: 'inline-block'
  }
};