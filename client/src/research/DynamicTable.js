import Immutable from 'immutable';
import PropTypes from 'prop-types';
import * as React from 'react';

import moment from 'moment';
import './ResearcherDataPage.css';

import {Table, Column, SortDirection, SortIndicator, CellMeasurer, CellMeasurerCache} from 'react-virtualized';
import 'react-virtualized/styles.css';
import {requestTranscript} from './Transcribe.js';

export default class DynamicHeightTableColumn extends React.PureComponent {
  static propTypes = {
    list: PropTypes.instanceOf(Immutable.List).isRequired,
    width: PropTypes.number.isRequired,
  };

  constructor(props) {
    super(props);

    const sortBy = 'index';
    const sortDirection = SortDirection.ASC;
    const sortedList = this._sortList({sortBy, sortDirection}, 0);
    //
    // //Create a dictionary mapping audioID to an audio element with the audio loaded in
    var audioPlayers = {};
    var transcriptDivs = {};
    var audioPromiseArray = [];
    var transcriptPromiseArray = [];
    const audioArray = sortedList.toArray().filter((row) => {
      if (row.json.uploadedUrl || row.json.audioUrl) {
        return true;
      }
      return false;
    });
    audioArray.forEach((row) => {
      const audioID = this._getAudioID(this._getAudioUrl(row));
      audioPromiseArray.push(
        this._getAudioPlayer(audioID).then((audioPlayer) => {
          audioPlayers[audioID] = audioPlayer;
        })
      );
      transcriptPromiseArray.push(
        this._getTranscript(audioID).then((transcript) => {
          transcriptDivs[audioID] = transcript;
        })
      );
    });

    //Force table to render once all audio players are created
    Promise.all(audioPromiseArray)
      .then(success => {
        this.forceUpdate();
      });

    //Force table to render when all transcripts are loaded
    Promise.all(transcriptPromiseArray)
      .then(success => {
        this.forceUpdate();
      });

    this.state = {
      disableHeader : false,
      headerHeight : 20,
      height : 1000,
      overscanRowCount : 10,
      rowCount : sortedList.size,
      scrollToIndex : undefined,
      sortBy,
      sortDirection,
      sortedList,
      audioPlayers,
      transcriptDivs
    };

    this._cache = new CellMeasurerCache({
      fixedWidth: true,
      minHeight: 50,
    });

    this._lastRenderedWidth = this.props.width;

    this._headerRenderer = this._headerRenderer.bind(this);
    this._rowClassName = this._rowClassName.bind(this);
    this._sort = this._sort.bind(this);
    this._getAudioUrl = this._getAudioUrl.bind(this);
    this._getAudioID = this._getAudioID.bind(this);
    this._getAudio = this._getAudio.bind(this);
  }



  shouldComponentUpdate(prevProps) {
    //Force table to render once all audio players are created
    //if (prevProps.searchWord !== this.props.searchWord) {
    if (prevProps.list !== this.props.list) {
      console.log('props have changed!');

      const sortBy = 'index';
      const sortDirection = SortDirection.ASC;
      console.log(prevProps.list);
      this.setState({sortedList : this._sortList({sortBy, sortDirection},  prevProps.list)}, function () {

        //Create a dictionary mapping audioID to an audio element with the audio loaded in
        var audioPlayers = {};
        var transcriptDivs = {};
        var audioPromiseArray = [];
        var transcriptPromiseArray = [];
        const audioArray = this.state.sortedList.toArray().filter((row) => {
          if (row.json.uploadedUrl || row.json.audioUrl) {
            return true;
          }
          return false;
        });
        audioArray.forEach((row) => {
          const audioID = this._getAudioID(this._getAudioUrl(row));
          audioPromiseArray.push(
            this._getAudioPlayer(audioID).then((audioPlayer) => {
              audioPlayers[audioID] = audioPlayer;
            })
          );
          transcriptPromiseArray.push(
            this._getTranscript(audioID).then((transcript) => {
              transcriptDivs[audioID] = transcript;
            })
          );
        });

        Promise.all(audioPromiseArray)
          .then(success => {
            this.forceUpdate();
          });

        //Force table to render when all transcripts are loaded
        Promise.all(transcriptPromiseArray)
          .then(success => {
            this.forceUpdate();
          });

      }
      );
      //const sortedList = this._sortList({sortBy, sortDirection});
      return true;
    }
    else {
      return false;
    }

  }


  // callBackSetState() {
  //   console.log('sortedList')
  //   console.log(this.state.sortedList)
  //
  //   //Create a dictionary mapping audioID to an audio element with the audio loaded in
  //   var audioPlayers = {};
  //   var transcriptDivs = {};
  //   var audioPromiseArray = [];
  //   var transcriptPromiseArray = [];
  //   const audioArray = this.state.sortedList.toArray().filter((row) => {
  //     if (row.json.uploadedUrl) {
  //       return true;
  //     }
  //     return false;
  //   });
  //   audioArray.forEach((row) => {
  //     const audioID = this._getAudioID(this._getAudioUrl(row));
  //     audioPromiseArray.push(
  //       this._getAudioPlayer(audioID).then((audioPlayer) => {
  //         audioPlayers[audioID] = audioPlayer;
  //       })
  //     );
  //     transcriptPromiseArray.push(
  //       this._getTranscript(audioID).then((transcript) => {
  //         transcriptDivs[audioID] = transcript;
  //       })
  //     );
  //   });
  //
  //   Promise.all(audioPromiseArray)
  //     .then(success => {
  //       this.forceUpdate();
  //     });
  //
  //   //Force table to render when all transcripts are loaded
  //   Promise.all(transcriptPromiseArray)
  //     .then(success => {
  //       this.forceUpdate();
  //     });
  // }


  _getDatum(list, index) {
    return list.get(index % list.size);
  }
  _getAudioUrl(row) {
    return row.json.audioUrl || (row.json.audioResponse && row.json.audioResponse.audioUrl) || (row.json.uploadedUrl);
  }
  _getAudioID(audioUrl) {
    if (audioUrl) {
      const slashIndex = audioUrl.lastIndexOf('/');
      const filename = audioUrl.slice(slashIndex + 1);
      const audioID = filename.slice(0,-4);
      return audioID;
    }
    return "";
  }
  _getAudio(audioID) {
    const token = this.props.token;
    //fetch audio file from s3
    return fetch('/server/research/wav/'+audioID+'.wav', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'x-teachermoments-token': token,
      },
      method: 'GET'
    })
      .then(results => {
        var response = new Response(results.body, {headers: {"Content-Type": "audio/wav"}});
        return response.blob().then(function(myBlob) {
          return URL.createObjectURL(myBlob);
        });
      })
      .catch(err => {
        console.log('there was an error');
      });
  }
  _getAudioPlayer(audioID) {
    return this._getAudio(audioID)
      .then(audioBlob => {
        return <audio controls id={audioID} src={audioBlob} type="audio/wav"> </audio>;
      })
      .catch(err => {
        console.log('Error in creating audio elements');
      });
  }
  _loadAudioPlayer(audioID) {
    const audioPlayer = this.state.audioPlayers[audioID];
    return audioPlayer;
  }
  _getTranscript(audioID) {
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
  _loadTranscript(audioID) {
    const transcript = this.state.transcriptDivs[audioID];
    return transcript;
  }

  _headerRenderer({dataKey, sortBy, sortDirection, label}) {
    return (
      <div>
        {label}
        {sortBy === dataKey && <SortIndicator sortDirection={sortDirection} />}
      </div>
    );
  }

  _sort({sortBy, sortDirection}, propList) {
    const sortedList = this._sortList({sortBy, sortDirection}, propList);

    this.setState({sortBy, sortDirection, sortedList});
  }

  _sortList({sortBy, sortDirection}, propList) {
    //const list = this.props.list;
    var list = this.props.list;
    if (propList !== 0) {
      list = propList;
      console.log('re writing the list to be');
      console.log(list);
    }

    const sortByColumn = (varA, varB) => {
      //edge case with rows that come from different parts of the row object
      //ie. the Prompt column consists of either row.text or row.youTubeId
      //Not sure how to handle this
      var a = varA[sortBy];
      var b = varB[sortBy];
      if (sortBy === "text") {
        if (typeof a === 'undefined') {
          a = "Teacher Moments Scene: " + varA['youTubeId'];
        }
        if (typeof b === 'undefined') {
          b = "Teacher Moments Scene: " + varB['youTubeId'];
        }
      }
      if ( a > b ) {
        return 1;
      }
      if (a < b ) {
        return -1;
      }
      return 0;
    };

    const sortedList = list
      .sort(sortByColumn)
      .update(
        list => (sortDirection === SortDirection.DESC ? list.reverse() : list),
      );
    console.log('sortedList right before return');
    console.log(sortedList);
    return sortedList;
  }

  _rowClassName({index}) {
    if (index < 0) {
      return "headerRow";
    } else {
      return index % 2 === 0 ? "evenRow virtualizedRow" : "oddRow virtualizedRow";
    }
  }

  _wrappingCellRenderer = ({width,cellData, dataKey, parent, rowIndex}) => {
    if (this._lastRenderedWidth !== width) {
      this._lastRenderedWidth = width;
      this._cache.clearAll();
    }
    return (
      <CellMeasurer
        cache={this._cache}
        columnIndex={0}
        key={dataKey}
        parent={parent}
        rowIndex={rowIndex}>
        <div
          className={"tableColumn"}
          style={{
            whiteSpace: 'normal',
          }}>
          {cellData}
        </div>
      </CellMeasurer>
    );
  };
  _wrappingCellRendererAgain = ({width,cellData, dataKey, parent, rowIndex}) => {
    if (this._lastRenderedWidth !== width) {
      this._lastRenderedWidth = width;
      this._cache.clearAll();
    }
    return (
      <CellMeasurer
        cache={this._cache}
        columnIndex={0}
        key={dataKey}
        parent={parent}
        rowIndex={rowIndex}>
        <div
          className={"tableColumn"}
          style={{
            whiteSpace: 'normal',
          }}>
          {cellData}
        </div>
      </CellMeasurer>
    );
  };

  _cellRenderer = ({width,cellData, dataKey, parent, rowIndex}) => {
    if (this._lastRenderedWidth !== width) {
      this._lastRenderedWidth = width;
      this._cache.clearAll();
    }
    return (
      <div
        style={{
          whiteSpace: 'normal',
        }}>
        {cellData}
      </div>
    );
  };

  render() {
    this.setState({rowCount: this.state.sortedList.size});
    console.log('this is rowcount');
    console.log(this.state.rowCount);
    const width = this.props.width;

    const {
      disableHeader,
      headerHeight,
      height,
      overscanRowCount,
      rowCount,
      scrollToIndex,
      sortBy,
      sortDirection,
      sortedList
    } = this.state;
    const rowGetter=({index}) => this._getDatum(sortedList, index);

    if (this._lastRenderedWidth !== this.props.width) {
      this._lastRenderedWidth = this.props.width;
      this._cache.clearAll();
    }

    return (
      <Table
        deferredMeasurementCache={this._cache}
        disableHeader={disableHeader}
        headerClassName={"headerColumn"}
        headerHeight={headerHeight}
        height={height}
        noRowsRenderer={this._noRowsRenderer}
        overscanRowCount={overscanRowCount}
        rowClassName={this._rowClassName}
        rowHeight={this._cache.rowHeight}
        rowGetter={rowGetter}
        rowCount={rowCount}
        scrollToIndex={scrollToIndex}
        sort={this._sort}
        sortBy={sortBy}
        sortDirection={sortDirection}
        width={width}
        key={this.props.searchWord}
      >
        <Column
          dataKey="timestamp"
          label="Timestamp"
          disableSort = {false}
          cellDataGetter={({ dataKey , rowData }) => moment(rowData[dataKey]).format('MM/DD/YY  h:mm:ssa')}
          cellRenderer= {this._cellRenderer}
          headerRenderer={this._headerRenderer}
          width={290}
        />
        <Column
          dataKey="email"
          label="Email"
          disableSort = {false}
          cellDataGetter={({ dataKey , rowData }) => rowData.json[dataKey]}
          headerRenderer={this._headerRenderer}
          width={400}
        />
        <Column
          dataKey="text"
          label="Prompt"
          disableSort = {false}
          cellDataGetter={({ dataKey , rowData }) => rowData.json.question.text || <div><span>Teacher Moments Scene: </span> <a href={"https://youtu.be/"+rowData.json.question.youTubeId}>https://youtu.be/{rowData.json.question.youTubeId}</a></div>}
          cellRenderer= {this._cellRenderer}
          headerRenderer={this._headerRenderer}
          width={width}
        />
        <Column
          dataKey="responseText"
          label="Response"
          disableSort = {false}
          cellDataGetter={({ dataKey , rowData }) => rowData.json[dataKey] || (this._getAudioUrl(rowData) && <div>{this._loadAudioPlayer(this._getAudioID(this._getAudioUrl(rowData)))} {this._loadTranscript(this._getAudioID(this._getAudioUrl(rowData)))} </div>)}
          cellRenderer= {this._wrappingCellRendererAgain}
          headerRenderer={this._headerRenderer}
          width={width}
        />
      </Table>
    );
  }
}
