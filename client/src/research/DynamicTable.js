import Immutable from 'immutable';
import PropTypes from 'prop-types';
import * as React from 'react';

import moment from 'moment';
import './ResearcherDataPage.css';

import {Table, Column, SortDirection, SortIndicator, CellMeasurer, CellMeasurerCache} from 'react-virtualized';
import 'react-virtualized/styles.css';

export default class DynamicHeightTableColumn extends React.PureComponent {
  static propTypes = {
    list: PropTypes.instanceOf(Immutable.List).isRequired,
    width: PropTypes.number.isRequired,
  };

  constructor(props) {
    super(props);

    const sortBy = 'index';
    const sortDirection = SortDirection.ASC;
    const sortedList = this._sortList({sortBy, sortDirection});

    this.state = {
      disableHeader : false,
      headerHeight : 20,
      height : 1000,
      overscanRowCount : 10,
      rowCount : sortedList.size,
      scrollToIndex : undefined,
      sortBy,
      sortDirection,
      sortedList
    };

    this._cache = new CellMeasurerCache({
      fixedWidth: true,
      minHeight: 25,
    });

    this._lastRenderedWidth = this.props.width;

    this._headerRenderer = this._headerRenderer.bind(this);
    this._rowClassName = this._rowClassName.bind(this);
    this._sort = this._sort.bind(this);
    this._getAudioUrl = this._getAudioUrl.bind(this);
    this._getAudioID = this._getAudioID.bind(this);
    this._getAudio = this._getAudio.bind(this);
  }

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
      return filename;
    }
    return "";
  }
  _getAudio(audioID) {
    const token = this.props.token;

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
          var elementTarget = document.getElementById(audioID);
          if (elementTarget) {
            document.getElementById(audioID).src = bloburl;
          }
          else{
            console.log('audio element cannot be found');
          }
        });
      })
      .catch(err => {
        console.log('there was an error');
      });
  }

  _headerRenderer({dataKey, sortBy, sortDirection, label}) {
    return (
      <div>
        {label}
        {sortBy === dataKey && <SortIndicator sortDirection={sortDirection} />}
      </div>
    );
  }
  
  _sort({sortBy, sortDirection}) {
    const sortedList = this._sortList({sortBy, sortDirection});

    this.setState({sortBy, sortDirection, sortedList});
  }

  _sortList({sortBy, sortDirection}) {
    const list = this.props.list;

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
          cellRenderer= {this._wrappingCellRenderer}
          headerRenderer={this._headerRenderer}
          width={width}
        />
        <Column
          dataKey="responseText"
          label="Response"
          disableSort = {false}
          cellDataGetter={({ dataKey , rowData }) => rowData.json[dataKey] || (this._getAudioUrl(rowData) && <audio controls id={this._getAudioID(this._getAudioUrl(rowData)).slice(0,-4)} src={this._getAudio(this._getAudioID(this._getAudioUrl(rowData)).slice(0,-4))} type="audio/wav"> </audio>) }
          cellRenderer= {this._wrappingCellRenderer}
          headerRenderer={this._headerRenderer}
          width={width}
        />
      </Table>
    );
  }
}