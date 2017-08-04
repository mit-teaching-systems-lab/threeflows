// Get all sorted responses that fit this particular type for a particular
// `applesKey`.  This only pulls out the anonymized text responses.
function getAnonymizedApples(params, cb) {
  const {queryDatabase, applesKey} = params;

  const sql = `
    SELECT
      json->'anonymizedText' as anonymized_text,
      json->'sceneNumber' as scene_number,
      json->'sceneText' as scene_text
    FROM evidence
    WHERE 1=1
      AND type = 'anonymized_apples_to_apples'
      AND json->>'applesKey' = $1
    ORDER BY
      scene_number ASC,
      scene_text ASC,
      anonymized_text ASC;`;
  const values = [applesKey];
  queryDatabase(sql, values, (err, result) => {
    if (err) {
      console.log('getAnonymizedApples: error', JSON.stringify(err));
      return cb(err);
    }

    const {rows} = result;
    return cb(null, {rows});
  });
}


module.exports = {
  // Queries database for anonymized responses to a particular Apples-to-Apples key
  sensitiveGetApples({queryDatabase}) {
    return (request, response) => {
      const applesKey = request.params.key;
      console.log('sensitiveGetApples: applesKey = ' + applesKey);
      getAnonymizedApples({queryDatabase, applesKey}, (err, result) => {
        if (err) {
          console.log('sensitiveGetApples: error', JSON.stringify(err));
          response.status(500);
          response.json({ status: 'error' });
          return;
        }

        const {rows} = result;
        console.log(`sensitiveGetApples: returning ${rows.length} rows...`);
        response.status(200);
        response.json(rows);
        return;
      });
    };
  }
};

