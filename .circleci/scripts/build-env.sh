#!/bin/bash

set -eux

FILTER='.Parameters[] | (.Name | sub("/[a-z]+?/"; "")) + ("=") + (.Value)'
ENVIRONMENT=${1:-"production development test"}
PROFILE=${2:-"whoismyvoice"}

# Define where pip executables are located based on `TARGET_ENV`
PIP_EXEC_PATH="${HOME}/.local/bin"

for env in ${ENVIRONMENT}
do
${PIP_EXEC_PATH}/aws ssm get-parameters-by-path --profile=${PROFILE} --path=/${env} --recursive \
  | jq --raw-output "${FILTER}" \
  > .env.${env}
done
