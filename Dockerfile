FROM node:latest

WORKDIR /usr/app

# instalar as dependências do APP
COPY package*.json ./
RUN npm install

# copia os arquivos para o APP Source
COPY . .

EXPOSE 3033

CMD ["npm", "start"]
CMD [ "node", "/db_webhook/createwhdb.js" ]