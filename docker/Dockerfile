FROM node:18-alpine

WORKDIR /worker/scalar

COPY . .

RUN npm install
RUN npm run build

ENTRYPOINT ["node", ".scalar/main.js"]