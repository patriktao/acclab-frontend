FROM node:14-alpine AS builder

#Work Directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

#Install App Dependencies
COPY package.json ./
COPY package-lock.json ./

RUN apt-get update

RUN npm install -g npm@8.7.0
RUN yarn add @craco/craco

#Add app
COPY . .

EXPOSE 3000

RUN yarn build


FROM nginx:1.19-alpine AS server
COPY --from=builder ./app/build /usr/share/nginx/html
