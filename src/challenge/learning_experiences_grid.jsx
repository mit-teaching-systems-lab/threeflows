import React from 'react';
import * as PropTypes from '../prop_types.js';
import {GridList, GridTile} from 'material-ui/GridList';


/*
Shows a grid of learning experiences a user can click through to.
Has some fixed sizing.
*/
export default React.createClass({
  displayName: 'LearningExperiencesGrid',

  propTypes: {
    learningExperiences: React.PropTypes.arrayOf(PropTypes.LearningExperience).isRequired
  },

  render() {
    const {learningExperiences} = this.props;
    return (
      <GridList
        cellHeight={200}
        cols={4}>
        {learningExperiences.map((tile, index) => {
          const key = `${tile.img}-${index}`;
          return (
            <a key={key} href={tile.href || null}>
              <GridTile
                key={key}
                title={tile.title}
              >
                <img src={tile.img} />
              </GridTile>
            </a>
          ); 
        })}
      </GridList>
    );
  }
});