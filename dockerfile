FROM node:18-alpine AS build

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install

COPY . .

RUN yarn build

FROM node:18-alpine

WORKDIR /app

COPY --from=build /app/dist /app

EXPOSE 3000

CMD ["yarn", "preview"]
