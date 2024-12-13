FROM node:18 AS build

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install

RUN echo "VITE_API_BASE_URL=https://de1.api.radio-browser.info/json/stations" > .env

COPY . .

RUN yarn build

FROM node:18

WORKDIR /app

COPY --from=build /app/dist /app/dist

COPY package.json yarn.lock ./

RUN yarn install 

EXPOSE 4173

CMD ["yarn", "preview", "--host", "0.0.0.0"]
