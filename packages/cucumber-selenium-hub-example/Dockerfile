FROM node:11.9-alpine
WORKDIR /usr/src/app
ADD https://raw.githubusercontent.com/vishnubob/wait-for-it/master/wait-for-it.sh ./
RUN chmod +x ./wait-for-it.sh
RUN apk update && apk add git bash
ENV containerized true
COPY package.json package-lock.json nightwatch-api-*.tgz ./
RUN npm install
COPY . .
CMD [ "./wait-for-it.sh", "selenium-hub:4444", "--", "npm", "test" ]
