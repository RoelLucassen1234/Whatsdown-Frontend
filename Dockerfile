FROM node:12.7-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm  build --prod --configuration=prod


FROM nginx:alpine
COPY --from=build /app/dist/Whatsdown-Messaging-Application /usr/share/nginx/html
EXPOSE 4200
EXPOSE 80