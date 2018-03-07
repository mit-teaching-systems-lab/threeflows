import React from 'react';

import * as SharedPropTypes from '../../prop_types.js';
import PropTypes from 'prop-types';
import createReactClass from 'create-react-class';
import PlainTextQuestion from './plain_text_question.jsx';

// Render a text scenario with a 3D model from Sketchfab
// Requires data set on the student about the id for the 
// Sketchfab model, and about the camera orientation.
export default createReactClass({
  displayName: 'TextModelScenario',

  propTypes: {
    scaffolding: SharedPropTypes.Scaffolding.isRequired,
    question: PropTypes.object.isRequired,
    student: SharedPropTypes.Student.isRequired,
    modelHeight: PropTypes.number.isRequired,
    onScenarioDone: PropTypes.func.isRequired
  },

  componentDidMount() {
    this.injectScript();
  },

  componentWillUnmount() {
    if (this.api) this.api.stop();
    if (this.client) delete this.client;
    if (window.Sketchfab) delete window.Sketchfab;
  },

  api: null,
  el: null,
  client: null,

  // injects window.Sketchfab
  injectScript() {
    const sketchPadScriptUrl = 'https://d1jlf623bx36qa.cloudfront.net/api/sketchfab-viewer-1.0.0.js';
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.async = true;
    script.onload = this.onScriptLoaded;
    script.src = sketchPadScriptUrl;
    document.getElementsByTagName('head')[0].appendChild(script);
  },

  // see https://help.sketchfab.com/hc/en-us/articles/203509907-Share-Embed-Online
  onScriptLoaded() {
    const {sketchFab} = this.props.student;
    this.client = new window.Sketchfab('1.0.0', this.el);
    this.client.init(sketchFab.id, {
      autostart: 1,
      camera: 0,
      ui_stop: 0, // eslint-disable-line camelcase
      preload: 1,
      autospin: 0.015,
      success: this.onSuccess,
      error: this.onError
    });
  },

  onError(err) {
    console.error('onError', err); // eslint-disable-line no-console
  },

  onSuccess(api) {
    api.start();
    api.addEventListener('viewerready', this.onApiLoaded);
    this.api = api;
    window.api = api;
  },

  onApiLoaded() {
    const {sketchFab} = this.props.student;
    if (this.api) {
      this.api.setFov(1);
      this.api.lookat(sketchFab.eye, sketchFab.target, 0.001);
      this.props.onScenarioDone();
    }
  },

  render() {
    const {question, modelHeight} = this.props;

    return (
      <div>
        <PlainTextQuestion question={question} />
        <div className="sketchfab-embed-wrapper">
          <iframe
            title="sketchfab"
            style={{...styles.sketchFabIframe, height: modelHeight}}
            ref={(el) => { if (el) this.el = el; }}
            width="100%"
            frameBorder={0}
          >Loading...</iframe>
        </div>
      </div>
    );
  }
});

const styles = {
  sketchFabIframe: {
    backgroundColor: 'black'
  }
};
