FROM node:alpine
ENV PYTHONUNBUFFERED=1
RUN apk add --update --no-cache python3 && ln -sf python3 /usr/bin/python
RUN python3 -m ensurepip
RUN pip3 install --no-cache --upgrade pip setuptools

RUN mkdir -p /app
ENV PORT 3000

WORKDIR /app

COPY package.json /app
COPY yarn.lock /app

# Production use node instead of root
# USER node

RUN yarn install --production

COPY . /app

RUN yarn build

EXPOSE 3000
CMD [ "yarn", "start" ]
