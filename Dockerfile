FROM node:lts-alpine as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM steebchen/nginx-spa:stable as production-stage

# adapt the `dist/` folder to the output directory your build tool uses (such as `dist/`, `build/` or `www/`).
COPY --from=build-stage /app/dist/ /app

EXPOSE 80

CMD ["nginx"]