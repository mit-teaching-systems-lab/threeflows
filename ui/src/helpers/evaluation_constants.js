/* @flow */
import * as MaterialColors from 'material-ui/styles/colors';

/*
Constants about evaluations.
*/
export const DEMONSTRATED_COMPETENCY = 1;
export const NOT_YET_COMPETENCY = 0;
export function colorFor(scoreValue:number) {
  return Colors[scoreValue] || 'black';
}
export const Colors = {
  [DEMONSTRATED_COMPETENCY]: MaterialColors.green500,
  [NOT_YET_COMPETENCY]: MaterialColors.orange500
};
