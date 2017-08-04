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

  componentDidMount() {
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

    const sceneToResponses = _.groupBy(applesResponses, 'scene_number');
    return (
      <div>
        <div style={styles.instructions}>Scroll through and play!</div>
        <div>{Object.keys(sceneToResponses).map((sceneNumber) => {
          return (
            <div key={sceneNumber}>
              <Card>
                <CardTitle
                  title={`Scene #${sceneNumber}`}
                  subtitle={sceneToResponses[sceneNumber][0]['scene_text']}
                />
                <CardText>
              <div style={styles.cardContainer}>
                {sceneToResponses[sceneNumber].map((applesResponse) => {
                  const anonymizedText = applesResponse['anonymized_text'];
                  return (
                    <Paper
                      key={anonymizedText}
                      style={styles.responseCard}
                      zDepth={3}>{anonymizedText}</Paper>
                  );
                })}
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
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
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
    margin: 10,
    textAlign: 'left',
    padding: 5,
    display: 'inline-block'
  }
};