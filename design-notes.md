# Design notes
Notes on design.

## Refactoring
1. Refactor into Scene/Response
2. Organize by practice space
3. Mark and isolate experimental prototypes
4. Refactor into two reusable formats: paper prototypes
5. Factor out "addons"
6. Authoring


## Reusable formats for practice spaces
Generally, these are closer to simulations than games, with a focus on enacting teaching decisions in-the-moment.

### Paper prototypes


### Context, Anticipate, Enact, Reflect


### Other Building blocks
#### Add-ons
- authentication: ask for email, via email, ask for anonymous identifier
- consent: before or after
- review: immediately, through email later
- review: anonymized set of text responses

#### Response types
flags               Interaction
---------------------------------------------------------------
(default)           ChoiceForBehaviorResponse
choices             ChoiceForBehaviorResponse
likert              LikertResponse
timedAutoAdvance    MinimalTimedView
feedback/pastNotes  ResponseWithPastNotes
notes               MinimalTextResponse
write               MinimalTextResponse
applesSceneNumber   ApplesTextResponse, MinimalTextResponse
open                MinimalOpenResponse, MinimalTextResponse

other custom responses:
CsFairScoreResponse
OpenThenClassifyResponse

### Custom practice spaces
These formats have been created for a particular workshop or course.
- Mr. Smith with notes
- CS Fair



## Prototypes and experiments
### Scenarios
Chat-based interfaces
Running experiments on Mechanical Turk
Answering surveys
Rendering 3D models

### Authoring
Twine authoring
Scenario authoring (forms)
Scenario authoring (blocks)

### Sharing and feedback


### Research and analysis



## Data storage
log: {type, params}
see ResponseTypes
see also injection of global and session values



## UI software design
From smaller to larger.

Interaction log (data.js)

Slide/Question
  Both
    RecordThenClassifyQuestion
  Scene
    MixedQuestion
    PlainQuestion
    ReactQuestion
  Response

QuestionInterpreter

LinearSession (rework to be key-based with getQuestion)

Page

