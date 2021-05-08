FROM node:16-alpine

WORKDIR /app

COPY package.json yarn.lock tsconfig.json ./
COPY src src

RUN yarn
RUN yarn build

CMD ["node", "dist/App.js"]
