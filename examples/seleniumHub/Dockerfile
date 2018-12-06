FROM node:9.3-alpine
RUN apk update && apk add git bash
WORKDIR "/app"
COPY package.json package-lock.json "/app/"
RUN npm install
COPY "." "/app"
