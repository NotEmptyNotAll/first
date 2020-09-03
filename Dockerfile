FROM node:latest as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
EXPOSE 8080
CMD ["npm","run","serve"]