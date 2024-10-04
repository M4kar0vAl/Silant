FROM node:22-alpine AS build_stage

WORKDIR /app

COPY package*.json .

RUN npm install

COPY . .

RUN npm run build

FROM nginx

COPY nginx.conf /etc/nginx/nginx.conf

COPY --from=build_stage /app/dist /usr/share/nginx/html

EXPOSE 80

CMD [ "nginx", "-g", "daemon off;" ]