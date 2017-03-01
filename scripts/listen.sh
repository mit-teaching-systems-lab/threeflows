# Fetch an audio ID from S3 on the command line (requires credentials).
AUDIO_ID=$1
TARGET_FOLDER=~/Desktop/wav-responses/

mkdir -p $TARGET_FOLDER

echo Fetching $AUDIO_ID into $TARGET_FOLDER...
aws s3 cp s3://message-popup/production_threeflows.herokuapp.com/wav-responses/$AUDIO_ID.wav $TARGET_FOLDER
open $TARGET_FOLDER/$1.wav
echo Opening...