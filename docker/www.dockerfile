FROM node:18-alpine

WORKDIR /worker/scalar

COPY . .

RUN apk add git

RUN npm install
RUN npm run build

HEALTHCHECK --interval=5m --timeout=3s \
    CMD curl -f http://localhost/ || exit 1

ENTRYPOINT ["node", ".scalar/main.js"]