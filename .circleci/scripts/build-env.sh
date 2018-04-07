#!/bin/bash

set -eux

FILTER='.Parameters[] | (.Name | sub("/[a-z]+?/"; "")) + ("=") + (.Value)'
ENVIRONMENT=${1:-"production development test"}
PROFILE=${2:-"whoismyvoice"}

# Define where pip executables are located based on `TARGET_ENV`
PIP_AWS_PATH="${HOME}/.local/bin/aws"
AWS="aws"
if [ -x "${PIP_AWS_PATH}" ]; then
  AWS="${PIP_AWS_PATH}"
fi

for env in ${ENVIRONMENT}
do
$AWS ssm get-parameters-by-path --profile=${PROFILE} --path=/${env} --recursive \
  | jq --raw-output "${FILTER}" \
  > .env.${env}
done
