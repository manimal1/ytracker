FROM mhart/alpine-node:10.14.0

LABEL author="Jeremiah McCurdy"

WORKDIR /var/www/ytracker

RUN mkdir client
COPY ./client/package.json client/package.json

COPY package.json .

COPY client/public client/public
COPY client/src client/src

COPY . /var/www/ytracker

RUN npm run client-install
RUN npm install
RUN npm run client-build

CMD [ "npm", "start" ]