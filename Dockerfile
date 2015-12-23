FROM nodesource/node:4.0
COPY . /app
WORKDIR /app
EXPOSE 8080
CMD ["bash", "start.sh"]
