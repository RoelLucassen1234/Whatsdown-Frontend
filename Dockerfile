FROM node:12.7-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
COPY . .
RUN npm install
RUN npm run build --prod


FROM nginx:alpine
COPY --from=build /app/dist/Whatsdown-Messaging-Application /usr/share/nginx/html
EXPOSE 4200
EXPOSE 80