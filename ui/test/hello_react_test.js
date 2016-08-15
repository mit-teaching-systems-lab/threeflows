import React from 'react';
import {mount, shallow, render} from 'enzyme';
import {expect} from 'chai';

import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
const Foo = React.createClass({
  displayName: 'Foo',

  render() {
    return <div>
      <div className="plain-div">hello</div>
      <RaisedButton label="success!" />
    </div>;
  }
});


describe('<Foo />', () => {
  it('can shallow render without a Material UI Theme', () => {
    const wrapper = shallow(<Foo hello="world" />);
    expect(wrapper.find(RaisedButton)).to.have.length(1);
    expect(wrapper.contains(<RaisedButton label="success!" />)).to.equal(true);
    expect(wrapper.find('.plain-div')).to.have.length(1);
    expect(wrapper.find('.plain-div').text()).to.equal('hello');
  });

  it('can test by mounting in the DOM', () => {
    const wrapper = mount(<MuiThemeProvider><Foo hello="world" /></MuiThemeProvider>);
    expect(wrapper.find(Foo).props().hello).to.equal('world');
    expect(wrapper.find('.plain-div')).to.have.length(1);
    expect(wrapper.find(RaisedButton)).to.have.length(1);
    expect(wrapper.find(RaisedButton).props().label).to.equal('success!');
  });

  it('can shallow render, but with Material UI Theme wrapper this is not very useful', () => {
    const wrapper = shallow(<MuiThemeProvider><Foo hello="world" /></MuiThemeProvider>);
    expect(wrapper.find(Foo)).to.have.length(1);
    expect(wrapper.find('.plain-div')).not.to.have.length(1);
  });

  it('can render to plain HTML', () => {
    const wrapper = render(<MuiThemeProvider><Foo hello="world" /></MuiThemeProvider>);
    expect(wrapper.find('.plain-div')).to.have.length(1);
    expect(wrapper.find('button')).to.have.length(1);
  });
});