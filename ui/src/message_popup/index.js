/* @flow */
import _ from 'lodash';
import type {ResponseLogT} from './types.js';
import ExperiencePage from './experience_page.jsx';
import ExplorationPage from './exploration_page.jsx';
import ScoringPage from './scoring_page.jsx';
import EvaluationViewerPage from './evaluation_viewer_page.jsx';
import MessageEvaluationCard from './message_evaluation_card.jsx';

// Returns a unique set of emails for people we have evidence for.
// The check for @ is because of older logs that used names instead of email
// addresses.
function emailsFromLogs(logs:[ResponseLogT]) {
  return _.uniq(_.compact(logs.map(log => log.json && log.json.name))).filter((name) => {
    return name.indexOf('@') !== -1;
  });
}

export {
  ExperiencePage,
  ExplorationPage,
  ScoringPage,
  EvaluationViewerPage,
  MessageEvaluationCard,
  emailsFromLogs
};
