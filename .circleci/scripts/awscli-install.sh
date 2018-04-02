#!/bin/bash

set -eux

#echo " -- Install python-dev and python-pip"
#sudo apt-get update
#sudo apt-get install -y python-dev python-pip

echo " -- Assuming a recent python is installed"

echo " -- Install AWS CLI"
pip install awscli==1.14.38 --upgrade --user

echo " -- Which AWS CLI Version?"
$HOME/.local/bin/aws --version
