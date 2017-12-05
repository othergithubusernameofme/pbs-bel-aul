FROM node:6-alpine



## ADD package.json /tmp/package.json
## RUN cd /tmp && npm install
## RUN mkdir -p /app && cp -a /tmp/node_modules /app/
WORKDIR /app

ADD . /app
RUN npm install --production

# COPY package.json /app/package.json
#COPY .env.example /starter/.env.example

CMD ["npm","start"]

EXPOSE 8002
