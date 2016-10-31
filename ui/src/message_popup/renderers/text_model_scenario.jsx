import React from 'react';

import * as PropTypes from '../../prop_types.js';
import PlainTextQuestion from './plain_text_question.jsx';

// Render a text scenario with a 3D model from SketchPad
// Requires data set on the student about the id for the 
// SketchPad model, and about the camera orientation.
export default React.createClass({
  displayName: 'TextModelScenario',

  propTypes: {
    scaffolding: PropTypes.Scaffolding.isRequired,
    question: React.PropTypes.object.isRequired,
    student: PropTypes.Student.isRequired,
    modelHeight: React.PropTypes.number.isRequired,
    onScenarioDone: React.PropTypes.func.isRequired
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
      ui_stop: 0,
      preload: 1,
      autospin: 0.01,
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
