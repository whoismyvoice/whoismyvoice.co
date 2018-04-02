#!/bin/bash

set -eux

FILTER='.Parameters[] | ("REACT_APP_") + (.Name | sub("/[a-z]+?/"; "") | ascii_upcase) + ("=") + (.Value)'
ENVIRONMENT=${1:-"production development test"}
PROFILE=${2:-"whoismyvoice"}

for env in ${ENVIRONMENT}
do
aws ssm get-parameters-by-path --profile=${PROFILE} --path=/${env} --recursive \
  | jq --raw-output "${FILTER}" \
  > .env.${env}
done
