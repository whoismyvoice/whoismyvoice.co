#!/bin/bash

set -eux

PROFILE=${1:-"whoismyvoice"}

if [ ! -d ~/.aws ]; then
  echo " -- Create .aws Directory --"
  mkdir ~/.aws
fi

echo " -- Create credentials File --"
cat <<EOF >> ~/.aws/credentials
[${PROFILE}]
aws_access_key_id = ${AWS_ACCESS_KEY_ID}
aws_secret_access_key = ${AWS_SECRET_ACCESS_KEY}
EOF

echo " -- Create config File --"
cat <<EOF >> ~/.aws/config
[profile ${PROFILE}]
region = us-east-1
output = json
EOF
