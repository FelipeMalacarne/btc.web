#Build Node
FROM node:17-alpine as builder
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
CMD ["npm", "run", "build"]

#Build nginx
FROM nginx:1.25.0-alpine as production
ENV NODE_ENV production
WORKDIR /var/www/html
RUN rm -rf ./*
COPY --from=builder /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
ENTRYPOINT [ "nginx", "-g", "daemon off;" ]
