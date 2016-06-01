import React from 'react';
import ReactDOM from 'react-dom';
import * as Routes from '../routes';
import * as PropTypes from '../prop_types.js';

//buttons and cards
import RaisedButton from 'material-ui/RaisedButton';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

//gridlist
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import Subheader from 'material-ui/Subheader';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';

//stepper
import {
  Step,
  Stepper,
  StepLabel,
  StepContent,
} from 'material-ui/Stepper';

//menu
// https://design.google.com/icons/
import Paper from 'material-ui/Paper';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import People from 'material-ui/svg-icons/social/people';
import RemoveRedEye from 'material-ui/svg-icons/image/remove-red-eye';
import Home from 'material-ui/svg-icons/action/home';
import VideoCall from 'material-ui/svg-icons/av/video-call';
import Chat from 'material-ui/svg-icons/communication/chat';
import Schedule from 'material-ui/svg-icons/action/schedule';
import Folder from 'material-ui/svg-icons/file/folder-shared';
import Settings from 'material-ui/svg-icons/action/settings';
import Search from 'material-ui/svg-icons/action/search';
import PersonAdd from 'material-ui/svg-icons/social/person-add';
import ContentLink from 'material-ui/svg-icons/content/link';
import Divider from 'material-ui/Divider';
import ContentCopy from 'material-ui/svg-icons/content/content-copy';
import Download from 'material-ui/svg-icons/file/file-download';
import Delete from 'material-ui/svg-icons/action/delete';
import FontIcon from 'material-ui/FontIcon';


//table
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';


const styles = {
  pre: {
    whiteSpace: 'pre-wrap'
  },
  root: {},
  gridList: {},

  //layout
  page: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#5481a9'
  },
  menu: {
    marginLeft: 10,
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: 15,
    paddingRight: 10,
  },
  challengeTitle: {
    display: 'block',
    fontSize: 32,
    color: 'white',
    fontWeight: 'bold'
  },
  section: {
    marginTop: 20,
    marginBottom: 20
  },
  cardTitleHeader: {
    fontSize: 24
  },

  //menu
  paper: {
    display: 'inline-block',
    margin: '16px 32px 16px 0',
  },
  rightIcon: {
    textAlign: 'center',
    lineHeight: '24px',
  },
};

export default React.createClass({
  displayName: 'ChallengePage',

  propTypes: {
    user: PropTypes.User.isRequired,
    challenge: PropTypes.Challenge.isRequired
  },

  render() {
    return (
      <div style={styles.page}>
        <div style={styles.menu}>{this.renderMenu()}</div>
        <div style={styles.content}>
          <a style={styles.challengeTitle} href={Routes.challengePath(this.props.id)}>{this.props.name} Challenge</a>
          <div style={styles.section}>{this.renderScenario()}</div>
          <div style={styles.section}>{this.renderSolution()}</div>
          <div style={styles.section}>{this.renderLearningObjectives()}</div>
          <div style={styles.section}>{this.renderLearningPlan()}</div>
          <div style={styles.section}>{this.renderActivities()}</div>
        </div>
      </div>
    );
  },

  renderMenu() {
    return (
      <div style={{width: 190}}>
        <Paper style={styles.paper}>
          <Menu>
            <MenuItem
              primaryText="Home"
              onTouchTap={() => Routes.navigate(Routes.Home)}
              leftIcon={<Home />} />
            <MenuItem
              primaryText="Search"
              disabled={true}
              leftIcon={<Search />} />
            <Divider />
            <MenuItem
              primaryText="Chat"
              onTouchTap={() => Routes.newTab(Routes.chatRoom('demo-academy'))}
              leftIcon={<Chat />} />
            <MenuItem
              primaryText="Video"
              onTouchTap={() => Routes.newTab(Routes.videoFor(this.props.challenge.name))}
              leftIcon={<VideoCall />}
              rightIcon={<People />} />
            <MenuItem
              primaryText="Drive"
              onTouchTap={() => Routes.newTab(Routes.driveFolder(this.props.user.driveFolderId))}
              leftIcon={<Folder />} />
            <Divider />
            <MenuItem
              primaryText="Settings"
              disabled={true}
              leftIcon={<Settings />} />
            <MenuItem
              primaryText="Help"
              onTouchTap={() => Routes.newTab(Routes.chatMessage('kevin'))}
              leftIcon={<Delete />} />
          </Menu>
        </Paper>
        <Paper style={styles.paper}>
          <Menu>
            <MenuItem
              primaryText="Calendar"
              onTouchTap={() => Routes.newTab(Routes.googleCalendar())}
              leftIcon={<Schedule />} />
            <iframe src="https://calendar.google.com/calendar/embed?showTitle=0&amp;showNav=0&amp;showDate=0&amp;showPrint=0&amp;showTabs=0&amp;showCalendars=0&amp;showTz=0&amp;mode=AGENDA&amp;height=600&amp;wkst=2&amp;bgcolor=%23FFFFFF&amp;src=9fbucpr2tm6b5vmkm5bkb57ffs%40group.calendar.google.com&amp;color=%23B1440E&amp;ctz=America%2FNew_York" style={{border: 0}} width="168" height="600" frameborder="0" scrolling="no"></iframe>
          </Menu>
        </Paper>
      </div>
    )
  },

  renderScenario() {
    const {driveFolderId} = this.props.user;
    return (
      <Card
        initiallyExpanded={true}>
        <CardHeader
          titleStyle={styles.cardTitleHeader}
          title="Scenario"
          subtitle="The students, classroom and context for this challenge"
          actAsExpander={true}
          showExpandableButton={true} />
        <CardText expandable={true}>
          <div style={styles.pre}>{this.props.scenario}</div>
        </CardText>
        <CardActions expandable={true}>
          <FlatButton
            secondary={true}
            label="Virtual classroom"
            onTouchTap={Routes.newTab.bind(Routes, 'https://docs.google.com/document/d/1y-F6SdaCLCSMw3GV5pR96MZHcZT2U4aWXXPTnRTd7ts/edit#heading=h.rphe0u4lat3v')} />
          <FlatButton
            secondary={true}
            label="Clarify scenario"
            onTouchTap={Routes.newTab.bind(Routes, Routes.chatMessage('ejspang'))} />
          <div style={{marginTop: 10, border: '1px solid #ccc', height: 200}}>
            <iframe src={`${Routes.embeddedDriveList(driveFolderId)}#list`} style={{width:'100%', height:'100%', border:0}}></iframe>
          </div>
        </CardActions>
      </Card>
    );
  },

  renderSolution() {
    return (
      <Card
        initiallyExpanded={true}>
        <CardHeader
          title="Solution"
          subtitle="When you're ready, show what you've learned."
          titleStyle={styles.cardTitleHeader}
          actAsExpander={true}
          showExpandableButton={true} />
        />
        <CardActions expandable={true}>
          <FlatButton
            label="Lesson Sketch"
            secondary={true}
            onTouchTap={Routes.newTab.bind(Routes, 'https://docs.google.com/document/d/1y-F6SdaCLCSMw3GV5pR96MZHcZT2U4aWXXPTnRTd7ts/edit#heading=h.yuqrdnz6q8dr')} />
          <FlatButton
            label="Message PopUp"
            secondary={true}
            onTouchTap={Routes.newTab.bind(Routes, 'https://docs.google.com/document/d/1y-F6SdaCLCSMw3GV5pR96MZHcZT2U4aWXXPTnRTd7ts/edit#heading=h.xtca7ch1ebmt')} />
        </CardActions>
      </Card>
    );
  },

  renderLearningObjectives() {
    const {learningObjectives} = this.props.challenge;
    const sortedLearningObjectives = _.sortBy(learningObjectives, (objective) => {
      if (objective.id.indexOf('PP') === 0) return [10, objective.id];
      if (objective.id.indexOf('IN') === 0) return [20, objective.id];
      if (objective.id.indexOf('BIO') === 0) return [30, objective.id];
      return [40, objective.id];
    });
    const collapsedLearningObjectives = _.map(_.groupBy(sortedLearningObjectives, 'competencyGroup'), (objectives, competencyGroup) => {
      return {
        competencyGroup,
        text: _.map(objectives, objective => `${objective.text}  ${objective.id}`).join("\n\n")
        // id: _.map(objectives, 'id').join(', ')
      };
    });
    return (
      <Card initiallyExpanded={false}>
        <CardHeader
          title="Learning objectives"
          subtitle="The competencies you'll focus on in this challenge"
          titleStyle={styles.cardTitleHeader}
          actAsExpander={true}
          showExpandableButton={true} />
        <CardText expandable={true}>
          <Table>
            <TableBody displayRowCheckbox={false}>
              {collapsedLearningObjectives.map(function(learningObjective) {
               return (
                  <TableRow key={learningObjective.competencyGroup} style={{height: 'auto'}}>
                    <TableRowColumn style={{verticalAlign: 'top', whiteSpace: 'pre-wrap', paddingTop: 10, paddingBottom: 10, width: '30%'}}>
                      <div style={{fontSize: 18}}>{learningObjective.competencyGroup}</div>
                      <div style={{fontSize: 10}}>{learningObjective.id}</div>
                    </TableRowColumn>
                    <TableRowColumn style={{verticalAlign: 'top', whiteSpace: 'pre-wrap', paddingTop: 10, paddingBottom: 10}}>{learningObjective.text}</TableRowColumn>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardText>
      </Card>
    );
  },

  renderLearningPlan() {
    return (
      <Card
        initiallyExpanded={false}>
        <CardHeader
          title="Learning Plan"
          titleStyle={styles.cardTitleHeader}
          subtitle="Make your own plan and get feedback"
          actAsExpander={true}
          showExpandableButton={true}
        />
        <CardActions expandable={true}>
          {this.renderStepper()}
        </CardActions>
      </Card>
    );
  },

  getInitialState: function() {
    return {
      areLearningObjectivesExpanded: false,
      stepIndex: 0
    };
  },

  handleNext: function() {
    this.setState({ stepIndex: this.state.stepIndex + 1 });
  },
  handlePrev: function() {
    this.setState({ stepIndex: this.state.stepIndex - 1 });
  },

  renderStepper() {
    const stepIndex = this.state.stepIndex;
    return (
      <div style={{width: 380, height: 450}}>
        <Stepper activeStep={stepIndex} orientation="vertical">
          <Step>
            <StepLabel>Understand the challenge</StepLabel>
            <StepContent>
              <p>First, review the challenge scenario and the challenge solution.</p>
              {this.renderStepActions(0)}
            </StepContent>
          </Step>
          <Step>
            <StepLabel>Review the learning objectives</StepLabel>
            <StepContent>
              <p>Reflect on what prior knowledge you might have.</p>
              {this.renderStepActions(1)}
            </StepContent>
          </Step>
          <Step>
            <StepLabel>Make your plan</StepLabel>
            <StepContent>
              <p>Write up a few paragraphs about how you'll tackel this challenge.</p>
              {this.renderStepActions(2)}
            </StepContent>
          </Step>
          <Step>
            <StepLabel>Get feedback</StepLabel>
            <StepContent>
              <p>Check in with your coach to get feedback on your plan.</p>
              {this.renderStepActions(3)}
            </StepContent>
          </Step>
        </Stepper>
      </div>
    );
  },

  renderStepActions(step) {
    const {stepIndex} = this.state;
    const lastStepIndex = 3;

    return (
      <div style={{margin: '12px 0'}}>
        <RaisedButton
          label={stepIndex === lastStepIndex ? 'Finish' : 'Next'}
          primary={true}
          onClick={this.handleNext}
          style={{marginRight: 12}}
        />
        {step > 0 && (
          <FlatButton
            label="Back"
            disabled={stepIndex === 0}
            onClick={this.handlePrev}
          />
        )}
      </div>
    );
  },

  renderActivities() {
    return (
      <Card
        initiallyExpanded={true}
        expandable={false}>
        <CardHeader
          title="Learning Experiences"
          titleStyle={styles.cardTitleHeader}
          actAsExpander={false}
          showExpandableButton={false}
        />
        <CardActions expandable={true}>
          {this.renderGrid()}
        </CardActions>
      </Card>
    );
  },

  renderGrid() {
    const tilesData = [
      {
        img: 'http://www.ballermindframe.com/pop-culture-spin/wp-content/uploads/sites/7/2015/04/sharktank.jpg',
        href: 'https://rnplay.org/apps/KJBRnQ',
        title: 'Cognitive Science Shark Tank',
      },
      {
        img: 'http://i-cdn.phonearena.com/images/article/41632-image/Google-Babel-references-appear-in-strings-of-code-pop-up-message.jpg',
        title: 'Message PopUp',
      },
      {
        img: 'http://cdn.rainbowresource.netdna-cdn.com/products/046383.jpg',
        title: 'Inquiry Kit',
      },
      {
        img: 'http://ecx.images-amazon.com/images/I/41vC9AUIoSL._AC_UL320_SR256,320_.jpg',
        title: 'Slate',
      },
      {
        img: 'https://www.mursion.com/wp-content/uploads/2015/11/Teacher-Preparation-And-Professional-Development.png',
        href: 'https://www.mursion.com/',
        title: 'Mursion',
      },
    ];
    return (
      <div style={styles.root}>
        <GridList
          cellHeight={200}
          cols={4}
          style={styles.gridList}
        >
          {tilesData.map((tile, index) => {
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
      </div>
    );
  }
});
