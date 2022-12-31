FROM node:18-alpine

WORKDIR /worker/scalar

COPY . .

RUN npm build
RUN npm install

ENTRYPOINT ["node", ".scalar/main.js"]