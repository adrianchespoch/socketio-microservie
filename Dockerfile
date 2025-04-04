FROM node:lts

LABEL maintainer="consultanodejs"

WORKDIR /backend

COPY ./package*.json /backend/

RUN cd /backend/ && npm install

COPY ./* /backend/
