import React from 'react';
import {Card, CardHeader, CardText} from 'material-ui/Card';


export default React.createClass({
  displayName: 'ExamplesCard',

  propTypes: {
    examples: React.PropTypes.array.isRequired,
    titleText: React.PropTypes.string.isRequired,
    style: React.PropTypes.object,
    cardStyle: React.PropTypes.object
  },

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
});


const styles = {
  examplesList: {
    padding: 0,
    paddingLeft: 20,
    listStyle: 'none',
    margin: 0
  }
};