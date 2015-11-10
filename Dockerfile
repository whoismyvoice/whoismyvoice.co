FROM centos:centos7

RUN yum install -y wget

RUN wget http://dl.fedoraproject.org/pub/epel/7/x86_64/e/epel-release-7-5.noarch.rpm

RUN rpm -ivh epel-release-7-5.noarch.rpm

RUN wget https://rpm.nodesource.com/pub_0.12/el/7/x86_64/nodejs-0.12.7-1nodesource.el7.centos.x86_64.rpm

RUN rpm -Uvh nodejs-0.12.7-1nodesource.el7.centos.x86_64.rpm

RUN yum install -y npm --enablerepo=epel --skip-broken

COPY . /app

WORKDIR /app

EXPOSE 8080

CMD ["bash", "start.sh"]
