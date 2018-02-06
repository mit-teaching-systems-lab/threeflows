import React from 'react';
import {shallow} from 'enzyme';
import {expect} from 'chai';
import sinon from 'sinon';

import {ListItem} from 'material-ui/List';
import AutoComplete from 'material-ui/AutoComplete';

import Students from './students.jsx';

import {testQuestion} from '../../test_fixtures.js';
import {allStudents} from '../../../data/virtual_school.js';

function testProps(props){
  return ({
    students: testQuestion.students,
    onAddStudent: sinon.spy(),
    onRemoveStudent: sinon.spy(),
    availableStudentList: allStudents.filter(student => !testQuestion.students.map(innerStudent => innerStudent.id).includes(student.id))
  });
}

describe('<Student />', ()=>{
  it('renders the initial students', ()=>{
    const props = testProps();
    const wrapper = shallow(<Students {...props} />);
    expect(wrapper.find(ListItem)).to.have.length(props.students.length);
    wrapper.find(ListItem).forEach(node => {
      expect(node.props().primaryText).to.be.oneOf(props.students.map(student => student.name));
    });
  });
  it('has the correct data source loaded in the auto complete', ()=>{
    const props = testProps();
    const wrapper = shallow(<Students {...props} />);
    expect(wrapper.find(AutoComplete)).to.have.length(1);
    expect(wrapper.find(AutoComplete).props().dataSource).to.deep.equal(props.availableStudentList.map(student => student.name));
  });
});