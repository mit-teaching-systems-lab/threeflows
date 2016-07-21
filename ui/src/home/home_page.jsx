/* @flow weak */
import React from 'react';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import * as Colors from 'material-ui/styles/colors';
import * as PropTypes from '../prop_types.js';
import ChallengeCard from './challenge_card.jsx';
import NavigationAppBar from '../components/navigation_app_bar.jsx';
import AudioRecorder from '../components/audio_recorder.jsx';



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
          title="Home"
          style={{backgroundColor: Colors.blueGrey500}} />
        <Card style={styles.card}>
          <CardHeader
            titleStyle={styles.cardTitleHeader}
            title="Challenges"/>
          <CardText>
            {this.props.challenges.map((challenge) => {
              return <ChallengeCard key="{challenge.id}" {...challenge} style={{ border: 'none', padding: 0 }} />;
            })}
          </CardText>
        </Card>
        <AudioRecorder
          url="/message_popup/wav"
          reviewing={this.renderReviewing}
          done={this.renderDone}
        />
      </div>
    );
  },

  renderReviewing({blob, downloadUrl, onSubmit, onRetry}) {
    return (
      <div>
        <div>Review your answer!</div>
        <audio controls={true} src={downloadUrl} />
        <div style={{marginTop: 20}}>Consider:</div>
        <ul>
          <li>NGSS inquiry practices</li>
          <li>Motivation</li>
          <li>Strong voice</li>
        </ul>
        <button onClick={onRetry}>Record again</button>
        <button onClick={onSubmit}>Submit</button>
      </div>
    );
  },

  renderDone({uploadedUrl}) {
    return (
      <div>
        <div>
          <a href={uploadedUrl} target="_blank">{uploadedUrl}</a>
        </div>
        <button>Done</button>
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