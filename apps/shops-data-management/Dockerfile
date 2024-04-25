# Multi staged dockerfile
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

COPY --from=development /usr/src/app/dist ./dist

CMD ["node", "dist/apps/shops-data-management/main"]