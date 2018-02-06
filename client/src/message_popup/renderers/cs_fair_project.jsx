/* @flow weak */
import PropTypes from 'prop-types';

import React from 'react';

import {Card, CardHeader, CardText} from 'material-ui/Card';



const sections = [
  { key: 'a', text: '2a: Provide information on your computing innovation and computational artifact.' },
  { key: 'b', text: '2b: Describe your development process, explicitly identifying the computing tools and techniques you used to create your artifact. Your description must be detailed enough so that a person unfamiliar with those tools and techniques will understand your process.' },
  { key: 'c', text: '2c: Explain at least one beneficial effect and at least one harmful effect the computing innovation has had, or has the potential to have, on society, economy, or culture.' },
  { key: 'd', text: '2d: Describe the data your innovation uses, how the innovation consumes (as input), produces (as output), and/or transforms data, and at least one data storage concern, data privacy concern, or data security concern directly related to the computing innovation.' },
  { key: 'e', text: '2e: Provide a list of at least three online or print sources used to create your computational artifact and/or support your responses to the prompts provided in this performance task.' }
];

// This renders a student's project for viewing.
export default class extends React.Component {
  props: {project: any};
  static displayName = 'CsFairProject';

  static propTypes = {
    project: PropTypes.any.isRequired
  };

  render() {
    const {project} = this.props;
    return (
      <div className="CsFairProject">
        {project.img && <img alt="Loading artifact..." src={project.img} width="100%" height="448" />}
        {project.video && <iframe width="100%" height="315" src={project.video} frameBorder="0"></iframe>}
        {sections.map((section) => {
          return (
            <Card key={section.key} style={{margin: 10, paddingTop: 10, whiteSpace: 'pre-line'}}>
              <CardHeader textStyle={{padding: 0, fontWeight: 'normal'}} title={section.text} />
              <CardText style={{wordWrap: 'break-word', fontStyle: 'italic'}}>{project[section.key]}</CardText>
            </Card>
          );
        })}
      </div>
    );
  }
}