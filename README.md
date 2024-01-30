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
