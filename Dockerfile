FROM mhart/alpine-node:10.14.0

WORKDIR /app

COPY package.json .
RUN npm install --quiet

COPY . .