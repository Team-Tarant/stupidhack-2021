FROM node:16-alpine

WORKDIR /app

COPY package.json package-lock.json tsconfig.json ./
COPY suomi24dump.json .
COPY src src

RUN npm i
RUN npm run build

CMD ["node", "dist/src/app.js"]
