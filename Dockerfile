FROM node:22-alpine as build

# server
WORKDIR /opt/app/server
ADD ./server/*.json .
RUN npm ci
ADD ./server .
RUN npm run build

# client
WORKDIR /opt/app/client
ADD ./client/*.json .
RUN npm ci
ADD ./client .
RUN npm run build

# main image
FROM nginx:alpine
COPY ./docker/nginx/conf.d/app.conf /etc/nginx/conf.d/default.conf
RUN apk add --update nodejs npm

# server
WORKDIR /opt/app/server
COPY --from=build /opt/app/server/dist .
ADD ./server/*.json .
RUN npm ci --omit=dev

# client
WORKDIR /opt/app/client
COPY --from=build /opt/app/client/dist .

WORKDIR /opt/app/server
RUN npm install pm2 -g
CMD pm2 start main.js && nginx -g "daemon off;"