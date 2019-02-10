FROM node:11.9-alpine
WORKDIR /usr/src/app
ENV containerized true
COPY package.json package-lock.json nightwatch-api-*.tgz ./
RUN npm install
COPY . .
CMD [ "npm", "test" ]
