RUN apt-get update && apt-get install -y nginx #Install NGINX

RUN mkdir /www && mkdir /senate/log #

RUN rm /etc/nginx/sites-enabled/default
ADD config/nginx.conf /etc/nginx/sites-enabled/nginx

EXPOSE 80 443