FROM node:alpine
WORKDIR /app

COPY package.json /app
COPY yarn.lock /app

RUN yarn install --ignore-engines

COPY . /app

CMD ["yarn", "run", "start"]
