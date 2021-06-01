FROM node:16.2-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist/Whatsdown-Messaging-Application /usr/share/nginx/html

