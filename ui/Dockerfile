FROM node:lts-alpine as build-stage

WORKDIR /app
COPY ./config.mjs ./

WORKDIR /app/ui
COPY ./ui/package*.json .
RUN npm install

COPY ./ui/ .

RUN npm run build

FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /app/ui/dist /usr/share/nginx/html
COPY ./ui/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]