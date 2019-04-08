import React, { Component } from 'react';
import moment from 'moment';
import _ from 'lodash';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

import Immutable from 'immutable';

import logo from './logo.svg';
import './ResearcherDataPage.css';
import {hashInto, colorNames} from './Anonymize.js';

import {AutoSizer} from 'react-virtualized';
import 'react-virtualized/styles.css';

//import * as Analyses from './Analyses.js';
import {requestTranscript} from './Transcribe.js';
import DynamicTable from './DynamicTable.js';


// https://codeburst.io/creating-a-full-stack-web-application-with-python-npm-webpack-and-react-8925800503d9
// https://codeburst.io/creating-a-full-stack-web-application-with-python-npm-webpack-and-react-beauty-and-495bfdf11841


/*
Requires local data from database and from S3.
*/


const styles = {
  table: {
    borderCollapse: 'collapse',
    border: '1px solid #ccc',
    margin: 20
  },
  cell: {
    verticalAlign: 'top',
    padding: 10,
    fontSize: 12
  }
};

function getAudioUrl(row) {
  return row.json.audioUrl || (row.json.audioResponse && row.json.audioResponse.audioUrl) || (row.json.uploadedUrl);
}

function hmtcaRowKey(row) {
  return [row.json.cohortKey, row.json.identifier, row.json.sessionId].join(" - ");
}

function ctMobileCspRowKey(row) {
  return [row.json.email, row.json.sessionId].join(" - ");
}

function escapedCell(cell) {
  return (cell && cell.replace)
    ? cell.replace(/\n/g, '  ')
    : cell;
}



function percentage(statsForSessions, filterFn) {
  return Math.round(100 * (statsForSessions.filter(filterFn).length / statsForSessions.length)) + '%';
}





// Decide what analysis to do
class ResearcherDataPage extends Component {
  constructor(props) {
    super(props);
    const analysisTuple = _.first(_.entries(props.analyses2)); //was _.last
    //console.log('analysisTuple')
    //console.log(analysisTuple)
    const [key, analysis] = analysisTuple;
    this.state = {
      //url: first_url,
      key: key,
      analysis: analysis,
      location: analysis.location, //'/teachermoments/turner?playtest20180124', //natalie commenting this out?
      token: this.props.token,
      email: this.props.email,
    };
  }



  onAnalysisChanged(e, index, targetAnalysisKey) {
    const {analyses2} = this.props;
    const analysisTuple = _.find(_.entries(analyses2), pair => pair[0] === targetAnalysisKey);
    const [key, analysis] = analysisTuple;
    this.setState({key, analysis});
  }

  render() {
    const currentKey = this.state.key;
    const currentAnalysis = this.state.analysis;
    //console.log('currentAnalysis is below.')
    //console.log(currentAnalysis)
    //const {filter, location} = currentAnalysis; //this is what it used to be.. problems 11/15
    const filter = currentAnalysis[1].filter;
    const location = currentAnalysis[1].location;
    return (
      <MuiThemeProvider>
        <div className="ResearcherDataPage">
          <div className="ResearcherDataPage-header">
            <img src={logo} className="ResearcherDataPage-logo" alt="logo" />
            {this.renderSelect(currentKey)}
          </div>
          <Analysis
            key={currentKey}
            analysisKey={currentKey}
            filter={filter}
            location={location}
            token = {this.state.token}
            email = {this.state.email}/>
        </div>
      </MuiThemeProvider>
    );
  }

  renderSelect(currentKey) {
    const {analyses2} = this.props;
    return (
      <SelectField
        style={{width: 'auto'}}
        floatingLabelText="Analysis"
        value={currentKey}
        onChange={this.onAnalysisChanged.bind(this)}
      >
        {_.entries(analyses2).map((analysisTuple) => {
          //console.log('analysisTuple is below.')
          //console.log(analysisTuple)
          const [key, analysis] = analysisTuple;
          const description = analysis[1].location;
          return <MenuItem
            key={key}
            value={key}
            primaryText={description} />;
        })}
      </SelectField>
    );
  }
}



class Analysis extends Component {
  propTypes: {
    analysisKey: React.PropTypes.string.isRequired,
    filter: React.PropTypes.func.isRequired,
    location: React.PropTypes.string.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      json: null,
      location: this.props.location,
      token: this.props.token,
      email: this.props.email,
      formValue: '',
      searchWord: null,
      scenarioTranscripts: null,
      formValueSA: '',
      SAEmail: null,
      resultsSA: null
    };

    this.getAudio = this.getAudio.bind(this);
    this.getAudioID = this.getAudioID.bind(this);
    //Natalie adding this for form
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onChangeSA = this.onChangeSA.bind(this);
    this.onSubmitSA = this.onSubmitSA.bind(this);

    this.natalieGetAudioUrl = this.natalieGetAudioUrl.bind(this);
    this.natalieGetAudioID = this.natalieGetAudioID.bind(this);
  }

  componentDidMount() {
    const location = this.state.location;
    const token = this.state.token;
    //console.log(location)
    //console.log(token)
    fetch('/server/research/data', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'x-teachermoments-location': location,
        'x-teachermoments-token': token,
      },
      method: 'GET'
    })
      .then(response => response.json())
      .then(this.onFetched.bind(this))
      .catch(this.onError.bind(this));
  }

  getAudioID(audioUrl) {
    if (audioUrl) {
      const slashIndex = audioUrl.lastIndexOf('/');
      const filename = audioUrl.slice(slashIndex + 1);
      return filename;
    }
    return "";
  }
  getAudio(audioID,elementID) {
    const token = this.state.token;

    fetch('/server/research/wav/'+audioID+'.wav', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'x-teachermoments-token': token,
      },
      method: 'GET'
    })
      .then(results => {
        var response = new Response(results.body, {headers: {"Content-Type": "audio/wav"}});
        response.blob().then(function(myBlob) {
          var bloburl = URL.createObjectURL(myBlob);
          var elementTarget = document.getElementById(audioID.slice(0, -4));
          if (elementTarget) {
            document.getElementById(audioID.slice(0, -4)).src = bloburl;
          }
          else{
            console.log('audio element cannot be found');
          }

          //send audioID for transcription
          requestTranscript(token,audioID)
            .then(results => {
              var elementTarget = document.getElementById(audioID.slice(0, -4));
              if (elementTarget) {
                document.getElementById(audioID.slice(0, -4)+"-transcript").innerHTML = "\""+results.transcript+"\"";
              }
              else{
                console.log('Could not insert transcript');
              }
            });
        });
      })
      .catch(this.onError.bind(this));
  }

  filter(json) {
    const {filter, analysisKey} = this.props;
    const rows = json.evidence.rows.filter(filter);

    // TODO(kr) invert this so caller passes
    // sorting by time, or by participant
    var sortedRows = rows;
    if (analysisKey === 'HMTCA') {
      sortedRows = _.sortBy(rows, hmtcaRowKey);
    } else if (analysisKey === 'CTMobileCSPSmith' || 'CTMobileCSPJayden') {
      sortedRows = _.sortBy(rows, ctMobileCspRowKey);
    } else {
      sortedRows = _.sortBy(rows, 'id');
    }
    return {evidence: {rows: sortedRows}};
  }

  doExport(rows, csvKeys) {
    const headerRow = csvKeys.join("\t");
    const csvRows = rows.map(row => csvKeys.map(csvKey => escapedCell(row[csvKey])).join("\t"));
    const csvString = [headerRow].concat(csvRows).join("\n");
    const a         = document.createElement('a');
    a.href        = 'data:attachment/tsv,' +  encodeURIComponent(csvString);
    a.target      = '_blank';
    a.download    = 'myFile.tsv';

    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  getNumberStudents(allRows){
    var i;
    var uniqueEmails = [];
    for (i = 0; i < allRows.length; i++) {
      const email = allRows[i].json.email;
      if (uniqueEmails.indexOf(email) === -1) {
        //its not in there already, new email
        uniqueEmails.push(email);
      }
    }
    return uniqueEmails.length;
  }

  getCleanAllRows(json) {
    const allRows1 = json.evidence.rows.filter(row => row.json.question !== undefined);
    //console.log('This works, but with duplicates and things without responses')
    //console.log(allRows1)
    const allRows2 = allRows1.filter(row => (row.json.audioUrl !== undefined || row.json.responseText !== undefined || (row.json.question.youTubeId !== undefined && row.json.uploadedUrl !== undefined)));

    //That works (only has things with responses)! Now need to get rid of duplicates.
    var allRows = [];
    var i;
    var lastTime = '';
    for (i = 0; i < allRows2.length; i++) {
      if (allRows2[i].timestamp !== lastTime){
        allRows.push(allRows2[i]);
      }
      lastTime = allRows2[i].timestamp;

    }
    return allRows;
  }

  natalieGetAudioUrl(row) {
    return row.json.audioUrl || (row.json.audioResponse && row.json.audioResponse.audioUrl) || (row.json.uploadedUrl);
  }

  natalieGetAudioID(audioUrl) {
    if (audioUrl) {
      const slashIndex = audioUrl.lastIndexOf('/');
      const filename = audioUrl.slice(slashIndex + 1);
      const audioID = filename.slice(0,-4);
      return audioID;
    }
    return "";
  }

  natalieGetTranscript(audioID) {
    const token = this.props.token;
    //request transcript for audio
    return requestTranscript(token,audioID)
      .then(results => {
        if (results.transcript){
          return <div id={audioID+"-transcript"}>Transcript: "{results.transcript}"</div>;
        }
        return <div id={audioID+"-transcript"}>Transcript: Unable to transcribe</div>;
      })
      .catch(err => {
        console.log('failure in transcription');
      });
  }

  filterAllRowsBySearchWord(searchWord, allRows) {
    if (searchWord == null) {
      return allRows;
    }
    else {
      searchWord = searchWord.toLowerCase();
      const filteredAllRows = [];
      var i;
      for (i = 0; i < allRows.length; i++) {
        if (getAudioUrl(allRows[i]) === undefined) {
          const text = allRows[i].responseText.toLowerCase();
          if (text.includes(searchWord)) {
            console.log('found written text with search word');
            filteredAllRows.push(allRows[i]);
          }
        }
        else {
          const audioUrl = this.natalieGetAudioUrl(allRows[i]);
          const audioID = this.natalieGetAudioID(audioUrl);
          var j;
          //console.log('current audioID', audioID);
          for (j=0; j<this.state.scenarioTranscripts.length; j++) {
            //console.log('this.state.scenarioTranscripts[j]', this.state.scenarioTranscripts[j]);
            if (this.state.scenarioTranscripts[j][[audioID]] !== undefined) {
              const text = this.state.scenarioTranscripts[j][[audioID]];
              if (text.includes(searchWord)) {
                console.log('found transcribed text with search word');
                console.log('found search word with audioID', audioID);
                console.log(text, "is text");
                filteredAllRows.push(allRows[i]);
              }
            }
          }
        }
      }
      console.log(this.state.scenarioTranscripts, "scenarioTranscripts");
      return filteredAllRows;
    }
  }


  gatherSAText(allRows) {
    //filter through allRows and grab the text that corresponds to the SAEMail
    if (this.state.SAEmail === null) {
      return null; //do nothing
    }
    else {
      var i;
      var textForSA = [];
      for (i = 0; i < allRows.length; i++) {
        const email = allRows[i].json.email;
        if (this.state.SAEmail === email) {
          //it was a match.
          //if it's a text row, then just grab the text
          //if it's audio, need to get transcript with audio ID through this.state.scenarioTranscripts
          if (getAudioUrl(allRows[i]) === undefined) {
            // text response
            const text = allRows[i].responseText.toLowerCase();
            textForSA.push(text);
          }
          else {
            //audio response
            //this is the repeating problem
            const audioUrl = this.natalieGetAudioUrl(allRows[i]);
            const audioID = this.natalieGetAudioID(audioUrl);
            var j;
            for (j=0; j<this.state.scenarioTranscripts.length; j++) {
              if (this.state.scenarioTranscripts[j][[audioID]] !== undefined) {
                const text = this.state.scenarioTranscripts[j][[audioID]];
                textForSA.push(text);
              }
            }
          }
        }
      }
      return textForSA;
    }
  }

  runSA(text) {
    if (text === null) {
      //return 'No Results';
      this.setState({resultsSA: null});
    }
    else {
      if (text.length === 0) {
        //return "No such email";
        this.setState({resultsSA: null});
      }
      else {
        //run SA here!!!!!!
        //$.get(window.location.href + 'SA', (results) => {
        // $.get('https://localhost:5000/SA', (results) => {
        //   console.log("RESULTS FROM PYTHON")
        //   console.log(results);
        // });
        console.log(text, "this is the text about to go into API");
        //4.7 adding this line
        this.setState({resultsSA: "Loading..."});
        // apiClass.postText(text)
        //   .then(res => {
        //     console.log("axios returned");
        //     console.log(res, "is the result from the POST");
        //     this.setState({resultsSA: res.data});
        //     }
        //   )
        fetch('/SA', {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'text': text
          },
          method: 'GET'
        })
          .then(response => response.json())
          .then(response =>  {
            console.log(response, "is response from the API");
            this.setState({resultsSA: response.ans});
          });

        //return "Happy";
      }
    }
  }

  onChange(event) {
    this.setState({formValue: event.target.value});
  }

  onChangeSA(event) {
    this.setState({formValueSA: event.target.value});
  }

  onSubmit(event, allRows) {
    const searchWord = this.state.formValue;
    event.preventDefault();
    this.setState({searchWord: searchWord});
  }

  onSubmitSA(event, allRows) {
    const SAEmail = this.state.formValueSA;
    event.preventDefault();
    this.setState({SAEmail: SAEmail});
    const textForSA = this.gatherSAText(allRows);
    this.runSA(textForSA);
  }

  onClear(event) {
    event.preventDefault();
    this.setState({searchWord: null});
  }

  onClearSA(event) {
    event.preventDefault();
    this.setState({SAEmail: null});
    this.setState({resultsSA: null});
  }


  onFetched(json) {
    const filtered = this.filter(json);
    this.setState({ json: filtered });
    // 1.30 fetch transcripts. have another .then for that, that sets the state to
    // the transcript data.

    var scenarioTranscripts = [];
    var i;
    var allRows = this.getCleanAllRows(json);
    for (i = 0; i < allRows.length; i++) {
      //find audio ID
      if (getAudioUrl(allRows[i]) !== undefined) {
        const audioUrl = this.natalieGetAudioUrl(allRows[i]);
        const audioID = this.natalieGetAudioID(audioUrl);
        //check if audioID is in DB cache, which has a table transcripts that maps audio_id to transcript
        // if audioID is not in DB cache already, then call natalieGetTranscript
        //this is the place where the repeating transcription errors occur.

        var haveTranscript = scenarioTranscripts[audioID];
        if (haveTranscript !== null) {
          this.natalieGetTranscript(audioID).then((t) => {
            const transcript = t;
            var transcribedText = "";
            if (transcript !== undefined) {
              transcribedText = transcript.props.children[1].toLowerCase();
            }
            //console.log(transcribed_text)
            //now search through the transcribed_text and look for searchWord.
            //if it's there, append that trancribed_text to an array.
            scenarioTranscripts.push({[audioID]: transcribedText});
          });
          
        }

      }
    }
    this.setState({scenarioTranscripts: scenarioTranscripts});
  }

  onError(exception) {
    console.log("error mounting\n", exception);
  }


  render() {
    const {json} = this.state;
    return (
      <div className="Analysis">
        {(json)
          ? this.renderJson(json)
          : <div style={{padding: 20}}>LOADING...</div>}
      </div>
    );
  }

  renderJson(json) {
    // 1/30 wait for transcript state to load.
    // console.log('This is json');
    // console.log(json);
    // console.log('This is all the data that used to be shown');
    // console.log(json.evidence.rows);
    var allRows = this.getCleanAllRows(json);

    const filteredAllRows = this.filterAllRowsBySearchWord(this.state.searchWord, allRows);
    console.log('filteredAllRows');
    console.log(filteredAllRows);

    var noToolsEmails = ["4.11.19.a1@gmail.com", "4.11.19.a2@gmail.com", "4.11.19.a3@gmail.com", "4.11.19.a4@gmail.com", "4.11.19.a5@gmail.com", "4.11.19.a6@gmail.com", "4.11.19.a7@gmail.com", "4.11.19.a8@gmail.com", "4.11.19.a9@gmail.com", "4.11.19.a10@gmail.com"];
    var d;
    var displayTools = true;
    for (d = 0; d < noToolsEmails.length; d++) {
      if (this.state.email === noToolsEmails[d]) {
        displayTools = false;
      }
    }
    if (displayTools === false) {
      if (filteredAllRows.length === 0) {
        return (
          <div>
            Text not found. Please press clear to return.
          </div>
        );
      }
      else {
        return (
          <div>
            <h2 style={{margin: 20}}>Events</h2>
            {json && <pre style={{margin: 20}}>{Object.keys(json).map(key => `${key}: ${allRows.length} rows`).join("\n")}</pre>}
            {json && this.renderEventsTableVirtualized(filteredAllRows)}
          </div>
        );
      }
    }
    if (filteredAllRows.length === 0) {
      return (
        <div>
          <h2 style={{margin: 20}}>Measurement Tools</h2>
          {this.renderMeasurementToolsTable(filteredAllRows)}
          Text not found. Please press clear to return.
        </div>
      );
    }

    else {
      return (
        <div>
          <h2 style={{margin: 20}}>Measurement Tools</h2>
          {this.renderMeasurementToolsTable(filteredAllRows)}
          <h2 style={{margin: 20}}>Events</h2>
          {json && <pre style={{margin: 20}}>{Object.keys(json).map(key => `${key}: ${allRows.length} rows`).join("\n")}</pre>}          
          {json && this.renderEventsTableVirtualized(filteredAllRows)}
        </div>

      );
    }
  }

  //test

  renderMeasurementToolsTable(allRows) {
    const numberOfStudents = this.getNumberStudents(allRows);
    return (
      <div>
        <table cellPadding="10">
          <thead>
            <tr>
              <th>Number of Students</th>
              <th scope="col">Keyword Detection</th>
              <th scope="col">Confusion Measurement Tool</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{numberOfStudents}</td>
              <td>
                <form name="myForm" onSubmit={e => this.onSubmit(e, allRows)}>
                  Keyword:<br/>
                  <input type="text" name="searchWord" value={this.state.formValue} onChange={this.onChange}/>
                  <input type="submit" value="Submit"/>
                </form>
                <button onClick={(e) => {this.onClear(e);}}>Clear</button>
              </td>
              <td>
                <form name="SAForm" onSubmit={e => this.onSubmitSA(e, allRows)}>
                  Email for Confusion Measurement:<br/>
                  <input type="text" name="SAEmail" value={this.state.formValueSA} onChange={this.onChangeSA}/>
                  <input type="submit" value="Submit"/>
                </form>
                <button onClick={(e) => {this.onClearSA(e);}}>Clear</button>
              </td>
              <td>
                Confusion Results: {this.state.resultsSA}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }



  // Summary stats
  renderStats(key, statsForSessions) {
    return (
      <div>
        <table style={styles.table}>
          <tbody>
            {this.renderStatsRow(`Count by "${key}"`, statsForSessions.length)}
            {this.renderStatsRow('Completed all "anticipate" questions', percentage(statsForSessions, stats => stats.anticipateCount >= 3))}
            {this.renderStatsRow('Completed each step of scenario', percentage(statsForSessions, stats => stats.totalResponseCount >= 18))}
            {this.renderStatsRow('Completed all "reflection" questions', percentage(statsForSessions, stats => stats.reflectCount === 3))}
            {this.renderStatsRow('Used on phone in text mode', percentage(statsForSessions, stats => stats.textModeCount > 0))}
            {this.renderStatsRow('Experienced learning as designed', percentage(statsForSessions, (stats) => {
              return (stats.textModeCount === 0 && stats.totalResponseCount >= 18 && stats.reflectCount  >= 3);
            }))}
          </tbody>
        </table>
        {this.renderGenericTable(statsForSessions)}
      </div>
    );
  }

  renderStatsNew(key, statsForSessions) {
    return (
      <div>
        <table style={styles.table}>
          <tbody>
            {this.renderStatsRow(`Number of "${key}"`, statsForSessions.length)}
            {this.renderStatsRow('Completed all "anticipate" questions', percentage(statsForSessions, stats => stats.anticipateCount >= 3))}
            {this.renderStatsRow('Completed each step of scenario', percentage(statsForSessions, stats => stats.totalResponseCount >= 14))}
            {this.renderStatsRow('Completed all "reflection" questions', percentage(statsForSessions, stats => stats.reflectCount === 3))}
            {this.renderStatsRow('Experienced learning as designed', percentage(statsForSessions, (stats) => {
              return (stats.anticipateCount >= 3 && stats.totalResponseCount >= 14 && stats.reflectCount  >= 3);
            }))}
          </tbody>
        </table>
        {this.renderGenericTable(statsForSessions)}
      </div>
    );
  }

  renderStatsRow(text, valueText) {
    return (
      <tr key={text}>
        <td style={styles.cell}>{text}</td>
        <td style={styles.cell}>{valueText}</td>
      </tr>
    );
  }

  renderGenericTable(rows) {
    const fields = Object.keys(rows[0] || {});
    return (
      <table style={styles.table}>
        <thead>
          <tr>{fields.map((field) => <th key={field} style={styles.cell}>{field}</th>)}</tr>
        </thead>
        <tbody>
          {rows.map((row) => {
            return <tr key={JSON.stringify(row)}>
              {fields.map((field) => {
                return <td key={field} style={styles.cell}>{row[field]}</td>;
              })}
            </tr>;
          })}
        </tbody>
      </table>
    );
  }

  renderHmtcaTable(json) {
    const csvRows = json.evidence.rows.map((row, i) => {
      return {
        id: row.id,
        timestampText: moment(row.timestamp).format('MM/DD/YY  h:mm:ssa'),
        cohortKey:row.json.cohortKey,
        identifier: row.json.identifier,
        sessionIdSlice: row.json.sessionId.slice(0, 6),
        backgroundColor: hashInto(hmtcaRowKey(row), colorNames),
        questionText: row.json.question.text,
        responseText: row.json.responseText,
        raw: row
      };
    });
    const identifierCount = _.uniq(json.evidence.rows.map(row => row.json.identifier)).length;

    return (
      <div>
        <div>Identifier count: {identifierCount}</div>
        <table style={styles.table}>
          <tbody>
            {csvRows.map((csvRow, i) => {
              return (
                <tr key={csvRow.id}>
                  <td style={styles.cell} title={JSON.stringify(csvRow.raw, null, 2)}>{csvRows.timestampText}</td>
                  <td style={styles.cell}>{csvRow.cohortKey}</td>
                  <td style={styles.cell}>{csvRow.identifier}</td>
                  <td style={styles.cell}>{csvRow.sessionIdSlice}</td>
                  <td
                    style={{backgroundColor: csvRow.backgroundColor}}
                    title={csvRow.identifier}>
                    {csvRow.identifier}
                  </td>
                  <td style={styles.cell}>{csvRow.questionText}</td>
                  <td style={styles.cell}>{csvRow.responseText}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }

  // For looking at raw events and sessions.  Hover to reveal more sensitive data.
  renderEventsTable(json) {
    const {analysisKey} = this.props;
    if (analysisKey === 'HMTCA') return this.renderHmtcaTable(json);
    return (
      <table style={styles.table}>
        <tbody>
          {json.evidence.rows.map((row, i) => {
            const audioUrl = getAudioUrl(row);
            const audioID = this.getAudioID(audioUrl);
            const emailBackgroundColor = (row.json.email)
              ? hashInto(row.json.email, colorNames)
              : 'white';
            return (
              <tr key={row.id} >
                <td style={styles.cell} title={JSON.stringify(row, null, 2)}>{moment(row.timestamp).format('MM/DD/YY  h:mm:ssa')}</td>
                <td
                  style={{backgroundColor: emailBackgroundColor, ...styles.cell}}>
                  {row.json.email}
                </td>
                <td style={styles.cell}>{row.json.question.text || <div><span>Teacher Moments Scene: </span> <a href={"https://youtu.be/"+row.json.question.youTubeId}>https://youtu.be/{row.json.question.youTubeId}</a></div>}</td>
                <td style={styles.cell}>{row.json.studentName}</td>
                <td style={styles.cell}>{row.json.projectLabel}</td>
                <td style={styles.cell}>{JSON.stringify(row.json.scoreValues, null, 2)}</td>
                <td style={styles.cell}>{row.json.choice}</td>
                <td style={styles.cell}>{JSON.stringify(row.json.textResponse) || row.json.responseText || (audioUrl && <div><audio controls id={audioID.slice(0,-4)} src={this.getAudio(audioID)} type="audio/wav"> </audio> <div id={audioID.slice(0,-4)+"-transcript"}>Transcript: </div></div>)}</td>
              </tr>
            );

          })}
        </tbody>
      </table>
    );
  }

  renderEventsTableVirtualized(json) {
    const simpleJson = json.map((blob) => {
      //console.log(blob)
      blob.email= blob.json.email;
      blob.text= blob.json.question.text;
      blob.youTubeId= blob.json.question.youTubeId;
      blob.responseText= blob.json.responseText;
      return blob;
    });
    console.log('this is simpleJson, getting passed into table');
    console.log(simpleJson);
    console.log('This is immutable.list(simpleJson)');
    console.log(Immutable.List(simpleJson));

    return (
      <div>
        <AutoSizer disableHeight>
          {({width}) => (
            <DynamicTable
              width={width}
              list={Immutable.List(simpleJson)}
              token={this.state.token}
              searchWord={this.state.searchWord}
            />
          )}
        </AutoSizer>
      </div>
    );
  }
}


export default ResearcherDataPage;
