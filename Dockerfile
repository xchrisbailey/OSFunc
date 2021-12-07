FROM node:17-alpine

RUN apk --no-cache upgrade && apk add --no-cache chromium

ADD package.json /tmp/package.json

RUN cd /tmp && npm install -q

ADD ./ /src
RUN rm -rf /src/node_modules && cp -a /tmp/node_modules /src

WORKDIR /src

CMD ["node", "src/index.js"]
