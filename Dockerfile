# run "npm run prod" befor executing this FILE
FROM node:12-alpine

WORKDIR /app

COPY package*.json ./

RUN npm i --production

COPY dist/ ./dist

EXPOSE 3030

ENTRYPOINT [ "npm" ]

CMD ["start"]