import { configure } from '@kadira/storybook';

function loadStories() {
  require('../src/message_popup/student_card_story.jsx');
  require('../src/message_popup/mobile_prototype/message_components_story.jsx');
}

configure(loadStories, module);