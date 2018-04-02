FROM circleci/node:8.11.0

USER root

RUN apt-get install -y python-pip python-dev

USER circleci

RUN pip install awscli==1.14.38 --upgrade --user

CMD ["/bin/sh"]
