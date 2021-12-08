FROM node:17-alpine

RUN apk add --no-cache \
    chromium \
    nss \
    freetype \
    harfbuzz \
    ca-certificates \
    ttf-freefont

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser

ADD package.json /tmp/package.json

RUN rm -rf build

RUN cd /tmp && npm install -q

ADD ./ /src
RUN rm -rf /src/node_modules && cp -a /tmp/node_modules /src

WORKDIR /src

RUN npm run-script build

CMD ["node", "build/index.js"]
