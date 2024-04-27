FROM node:18 as development

WORKDIR /usr/src/app

COPY package*.json .
RUN npm install

COPY . .

COPY start.sh /start.sh
RUN chmod +x /start.sh

RUN npm run build shops-data-management

FROM node:18 as production

WORKDIR /usr/src/app

COPY package*.json .
RUN npm install --production=true

COPY . .

RUN npm add -D sequelize-cli
WORKDIR /usr/src/app/apps/shops-data-management
RUN npx sequelize-cli db:migrate
RUN npx sequelize-cli db:seed:all
WORKDIR /usr/src/app
RUN npm remove sequelize-cli

COPY --from=development /usr/src/app/dist ./dist

CMD ["node", "dist/apps/shops-data-management/main"]