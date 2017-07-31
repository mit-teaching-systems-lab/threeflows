# Who has taken the scenario?
SELECT DISTINCT json->>'email'
  FROM evidence
  WHERE 1=1
   AND json->'GLOBAL'->>'location' IN (
    'https://threeflows.herokuapp.com/teachermoments/tuesday',
    'https://threeflows.herokuapp.com/teachermoments/smithA',
    'https://threeflows.herokuapp.com/teachermoments/smithB',
    'https://threeflows.herokuapp.com/teachermoments/sub?group=css',
    'https://threeflows.herokuapp.com/teachermoments/sub?group=caf',
    'https://threeflows.herokuapp.com/teachermoments/sub?group=playtest',
    'https://threeflows.herokuapp.com/teachermoments/sub',
    'https://threeflows.herokuapp.com/teachermoments/ecs',
    'https://threeflows.herokuapp.com/teachermoments/ecs?text',
    'https://threeflows.herokuapp.com/teachermoments/rosa?ecs&text',
    'https://threeflows.herokuapp.com/teachermoments/rosa?ecs',
    'https://threeflows.herokuapp.com/teachermoments/jayden'
  )
  ORDER BY json->>'email' ASC;



# Get all sessions for a (user, scenario) pair.
SELECT DISTINCT json->>'sessionId'
FROM evidence
WHERE 1=1
  AND json->>'email' = 'krob@mit.edu'
ORDER BY json->>'sessionId' ASC;


# Get all responses from all sessions for a (user, scenario) pair.
SELECT
  json->>'sessionId',
  timestamp,
  type,
  json->'question',
  json->>'audioUrl'
FROM evidence
WHERE 1=1
  AND json->>'email' = 'krob@mit.edu'
  AND json->'GLOBAL'->>'location' = 'https://threeflows.herokuapp.com/teachermoments/tuesday'
ORDER BY json->>'sessionId', id ASC;


SELECT distinct(json->'email') FROM evidence WHERE type='message_popup_audio_response' ORDER BY json->'email' ASC;