# Weather-app
Weather App - Consulta Meteorológica Sem Chave de API
Descrição:

Weather App é uma aplicação Node.js que oferece uma solução simplificada para desenvolvedores consultarem dados meteorológicos sem a necessidade de uma chave de API. 

Node.js versão:

```bash
v21.1.0
```

MySQL versão:

```bash
^3.8.0
```

Ao Importar esse sistema para sua máquina, certifique-se de ter o Node.js e MySql compatíveis com as versões acima.

Comece dando o seguinte comando para instalar o node_Modules em sua máquina:
```bash
npm install
```

Esse comando irá instalar as seguintes dependências que são necessárias para que o projeto rode em sua máquina:
```bash
"dependencies": {
        "axios": "^1.6.5",
        "dotenv": "^16.4.0",
        "express": "^4.18.2",
        "mysql2": "^3.8.0",
        "sequelize": "^6.35.2"
      },
      "devDependencies": {
        "nodemon": "^3.0.3"
      } 
```

Certifique-se também de ter o Docker instalado, pois ele irá ser necessário para rodar o Projeto.

Após estar com o Docker aberto em sua máquina, na raiz do projeto, escreva o seguinte comando:
```bash
docker-compose build
```
Após a construção das imagens, inicie os contêineres com o seguinte comando:
```bash
docker-compose up -d
```
Esse comando irá colocar seu projeto junto com sua imagem para rodar em seu container, ambos estando na mesma Network.

# Configurar o ambiente Docker
Rode o seguinte comando na terminal root do seu projeto:
```javascript
docker exec -it weather-my-mysql-1 mysql -u root -p
// esse comando vai lhe redirecionar ao MySql dentro do seu Docker, Insira a Senha "password" para fazer login.
```
Agora você deve criar o Banco de Dados "weather" com seguinte comando:
```mysql
CREATE DATABASE weather;
```
Esse Database é necessário para que sua aplicação rode.
agora você deve entrar no bash da aplicação node, na sua terminal execute o seguinte comando:
```bash
docker exec -it weather-app-1 bash
```
É Necessário entender que há dois arquivos responsáveis por criar as tabelas do projeto, e precisamos rodar eles dentro do docker, sendo assim necessário o banco de dados "weather" já estar criado.
Após estar no bash da sua aplicação node.js, devemos rodar os arquivos /user/app/db_webhook/createwhdb.js e /user/app/db_connection/dbcreate.js, para isso iremos executar os demais comandos:

```bash
cd /db_webhook/
node createwhdb.js
```
E então devemos realizar isso com o segundo arquivo:
```bash
cd ..
cd /db_connection/
node dbcreate.js
```
Agora sua aplicação deve estar com os bancos de dados criados, conectados e rodando!
