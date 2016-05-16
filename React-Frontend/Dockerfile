FROM node:6.1.0

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

EXPOSE 8080

COPY package.json /usr/src/app/
RUN npm install
COPY . /usr/src/app

RUN npm start

CMD [ "node", "./node_modules/webpack-dev-server/bin/webpack-dev-server.js", "--host", "0.0.0.0" ]
