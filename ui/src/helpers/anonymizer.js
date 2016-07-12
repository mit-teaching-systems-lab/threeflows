import fakeNames from '../data/fake_names.js';
import d3 from 'd3';


// Make this a consistent hash from the value
export function create() {
  const nameScale = d3.scale.ordinal()
    .range(fakeNames);
  
  return {
    name: (d) => nameScale(d.json.name)
  };     
}