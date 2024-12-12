FROM node:18 AS build

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install --ignore-engines

COPY . .

RUN yarn build

FROM node:18

WORKDIR /app

COPY --from=build /app/dist /app

EXPOSE 3000

CMD ["yarn", "preview"]
