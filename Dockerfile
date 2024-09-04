# build stage
FROM node:lts-alpine as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY . .
RUN npm run build-prod

# production stage
FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
COPY ./bin/entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod u+x /usr/local/bin/entrypoint.sh
EXPOSE 80
ENTRYPOINT [ "/usr/local/bin/entrypoint.sh" ]
CMD ["nginx", "-g", "daemon off;"]