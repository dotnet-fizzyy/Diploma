FROM node:14-alpine
WORKDIR /app

COPY package.json /app
COPY yarn.lock /app

RUN npm install yarn
RUN yarn install --ignore-engines

COPY . /app

CMD ["yarn", "run", "start"]
