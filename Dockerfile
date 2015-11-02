FROM node:latest

ENV PORT 80

ADD ./ /app
WORKDIR /app

EXPOSE 80

RUN npm install
CMD ["bash", "start.sh"]