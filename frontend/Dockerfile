#
# build image
#
FROM node:12.2.0 as build

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY package.json /app/package.json
RUN npm install
RUN npm install -g @angular/cli@8.3.15

COPY . /app

RUN ng build --prod --output-path=dist

#
# prod imagem
#
FROM nginx:1.17.5-alpine

ENV NODE_ENV production

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

# run nginx
CMD ["nginx", "-g", "daemon off;"]
