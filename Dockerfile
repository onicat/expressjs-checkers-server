FROM node:current-slim

WORKDIR /usr/src/app

COPY package.json .

RUN npm i

EXPOSE 3005

CMD [ "npm", "run", "server" ]

COPY . .