FROM node:11.9-alpine
RUN apk update && apk add git bash
WORKDIR "/app"
ENV containerized true
COPY package.json package-lock.json "/app/"
RUN npm install
COPY "." "/app"
