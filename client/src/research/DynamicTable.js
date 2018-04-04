import PropTypes from 'prop-types';
import * as React from 'react';

import moment from 'moment';
import './ResearcherDataPage.css';

import {Table, Column, SortDirection, SortIndicator, CellMeasurer, CellMeasurerCache} from 'react-virtualized';
import 'react-virtualized/styles.css';

export default class DynamicHeightTableColumn extends React.PureComponent {
  static propTypes = {
    list: PropTypes.array.isRequired,
    width: PropTypes.number.isRequired,
    s3: PropTypes.string.isRequired
  };

  _cache = new CellMeasurerCache({
    fixedWidth: true,
    minHeight: 25,
  });

  _lastRenderedWidth = this.props.width;

  render() {
    const json = this.props.list;
    const width = this.props.width;
    const s3 = this.props.s3;

    const disableHeader = false;
    const headerHeight = 20;
    const height = 400;
    const overscanRowCount = 10;
    const rowCount = json.length;
    const scrollToIndex = undefined;
    const sortBy = 'index';
    const sortDirection = "ASC";
    const rowGetter=({index}) => json[index%json.length];

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
          dataKey="Timestamp" 
          label="Timestamp"
          disableSort = {false}
          cellDataGetter={({ dataKey , rowData }) => moment(rowData[dataKey]).format('MM/DD/YY  h:mm:ssa')}
          cellRenderer= {this._cellRenderer}          
          headerRenderer={this._headerRenderer}
          width={300} 
        />
        <Column 
          label="Email" 
          dataKey="email" 
          cellDataGetter={({ dataKey , rowData }) => rowData.json[dataKey]}
          headerRenderer={this._headerRenderer}
          width={400} 
        />
        <Column
          label="Prompt"
          dataKey="text"
          cellDataGetter={({ dataKey , rowData }) => rowData.json.question.text || <div><span>Teacher Moments Scene: </span> <a href={"https://youtu.be/"+rowData.json.question.youTubeId}>https://youtu.be/{rowData.json.question.youTubeId}</a></div>}
          cellRenderer= {this._wrappingCellRenderer}
          headerRenderer={this._headerRenderer}
          width={width}
        />
        <Column
          label="Response"
          dataKey="responseText"
          cellDataGetter={({ dataKey , rowData }) => rowData.json[dataKey] || (this._getAudioUrl(rowData) && <audio controls={true} src={this._rewriteAudioUrl(s3, this._getAudioUrl(rowData))} /> )}
          headerRenderer={this._headerRenderer}
          width={width}
        />
      </Table>
      );
    }

    _getAudioUrl(row) {
      return row.json.audioUrl || (row.json.audioResponse && row.json.audioResponse.audioUrl) || (row.json.uploadedUrl);
    }
    _rewriteAudioUrl(s3Folder, audioUrl) {
      const slashIndex = audioUrl.lastIndexOf('/');
      const filename = audioUrl.slice(slashIndex + 1);
      return `${s3Folder}${filename}`;
    }

    _headerRenderer({dataKey, sortBy, sortDirection, label}) {
      return (
        <div>
          {label}
          {sortBy === dataKey && <SortIndicator sortDirection={sortDirection} />}
        </div>
      );
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
          className={"tableColumn"}
          style={{
            whiteSpace: 'normal',
          }}>
          {cellData}
        </div>
      );
    };
  }