FROM node:17-alpine

ENV CHROME_BIN=/usr/bin/chromium-browser
RUN apk --no-cache upgrade && apk add --no-cache chromium

ADD package.json /tmp/package.json

RUN rm -rf build

RUN cd /tmp && npm install -q

ADD ./ /src
RUN rm -rf /src/node_modules && cp -a /tmp/node_modules /src

WORKDIR /src

RUN npm run-script build

CMD ["node", "build/index.js"]
