FROM node:18-alpine

WORKDIR /worker/scalar

COPY . .

RUN npm install

ENTRYPOINT ["node", ".scalar/main.js"]