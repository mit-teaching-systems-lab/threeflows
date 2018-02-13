/* @flow weak */
import PropTypes from 'prop-types';

import React from 'react';
import {Card, CardHeader, CardText} from 'material-ui/Card';


export default class extends React.Component {
  props: {
    examples: Array<$FlowFixMe>,
    titleText: string,
    style?: Object,
    cardStyle?: Object,
  };

  static displayName = 'ExamplesCard';

  static propTypes = {
    examples: PropTypes.array.isRequired,
    titleText: PropTypes.string.isRequired,
    style: PropTypes.object,
    cardStyle: PropTypes.object
  };

  render() {
    const {examples, titleText, style, cardStyle} = this.props;
    const listStyle = {...styles.examplesList, ...style};

    return (
      <Card key={titleText} style={cardStyle}>
        <CardHeader
          title={titleText}
          actAsExpander={true}
          initiallyExpanded={true}
          showExpandableButton={true}
        />
        <CardText expandable={true}>
          <ul style={listStyle}>{examples.map((text) => {
            return <li key={text} style={{paddingBottom: 20}}>{text}</li>;
          })}</ul>
        </CardText>
      </Card>
    );
  }
}


const styles = {
  examplesList: {
    padding: 0,
    paddingLeft: 0,
    listStyle: 'none',
    margin: 0
  }
};