#!/bin/bash

set -eux

# Default target environment is staging, unless 'production' is passed to this
# script as the first argument.
#
# NOTE: This is the ideal case, left for posterity, it is overwritten by
#       the check below.
TARGET_ENV=${1:-testing}

# Set based on conditions in script because it can't be set based on workflow
# in CircleCI config.
echo " -- Setting ENV based on CIRCLE_BRANCH: ${CIRCLE_BRANCH}"
if [ $CIRCLE_BRANCH = "master" ]; then
  TARGET_ENV="production"
else
  TARGET_ENV="${CIRCLE_BRANCH}"
fi

# chose the production or the staging server based on $ENV
if [ $TARGET_ENV = "production" ]; then
  BUCKET="whoismyvoice-www"
elif [ $TARGET_ENV = "staging" ]; then
  BUCKET="whoismyvoice-stage"
else
  BUCKET="whoismyvoice-test"
fi

# Define where pip executables are located based on `TARGET_ENV`
PIP_EXEC_PATH="${HOME}/.local/bin"

${PIP_EXEC_PATH}/aws s3 sync build/ s3://${BUCKET}

echo " -- Done"
exit 0
