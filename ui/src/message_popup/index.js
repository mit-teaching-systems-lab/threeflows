/* @flow */
import _ from 'lodash';
import type {ResponseLogT} from './types.js';
import ExperiencePage from './experience_page.jsx';
import DemoPage from './demo_page.jsx';
import TwinePage from './twine/twine_page.jsx';
import PlaytestExperiencePage from './playtest/playtest_experience_page.jsx';
import DansonExperiencePage from './playtest/danson_experience_page.jsx';
import OkonofuaInsubordinationPage from './playtest/okonofua_insubordination_page.jsx';
import ExplorationPage from './exploration_page.jsx';
import ScoringPage from './scoring_page.jsx';
import EvaluationViewerPage from './evaluation_viewer_page.jsx';
import MessageEvaluationCard from './message_evaluation_card.jsx';
import QuestionsPage from './author/questions_page.jsx';
import EditQuestionPage from './author/edit_question_page.jsx';
import NewQuestionPage from './author/new_question_page.jsx';

// Returns a unique set of emails for people we have evidence for.
// The check for @ is because of older logs that used names instead of email
// addresses.
export function candidateEmailFromLog(log:ResponseLogT) {
  if (!log.json) return undefined;
  if (log.json.email) return log.json.email;
  if (log.json.name && log.json.name.indexOf('@') !== -1) return log.json.name;
  return undefined;
}

export function emailsFromLogs(logs:[ResponseLogT]) {
  return _.uniq(_.compact(logs.map(candidateEmailFromLog)));
}

export {
  ExperiencePage,
  DemoPage,
  TwinePage,
  PlaytestExperiencePage,
  DansonExperiencePage,
  OkonofuaInsubordinationPage,
  ExplorationPage,
  ScoringPage,
  EvaluationViewerPage,
  MessageEvaluationCard,
  QuestionsPage,
  EditQuestionPage,
  NewQuestionPage,
};
