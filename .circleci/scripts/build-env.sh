#!/bin/bash

set -eux

FILTER='.Parameters[] | ("REACT_APP_") + (.Name | sub("/[a-z]+?/"; "") | ascii_upcase) + ("=") + (.Value)'
ENVIRONMENT=${1:-"production development test"}
PROFILE=${2:-"whoismyvoice"}

# Define where pip executables are located based on `TARGET_ENV`
PIP_EXEC_PATH="${HOME}/.local/bin"

# If profile is explicitly passed as NONE then don't use profile with `aws`
if [ "NONE" = $PROFILE ]; then
  PROFILE_ARG=""
else
  PROFILE_ARG="--profile=${PROFILE}"
fi

for env in ${ENVIRONMENT}
do
${PIP_EXEC_PATH}/aws ssm get-parameters-by-path ${PROFILE_ARG} --path=/${env} --recursive \
  | jq --raw-output "${FILTER}" \
  > .env.${env}
done
