FROM ubuntu:latest

WORKDIR /usr/src/frontend

COPY package.json .

RUN apt-get update

RUN apt-get install -y curl

RUN curl -sL https://deb.nodesource.com/setup_14.x | bash

RUN apt-get install -y nodejs

RUN npm install

COPY index.js .

ADD public/ /usr/src/frontend/public/

ADD views/ /usr/src/frontend/views/


EXPOSE 8000

RUN nohup node index.js &