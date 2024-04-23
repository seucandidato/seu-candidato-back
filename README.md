## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

bash
$ npm install


## Ambiente

### Versões

É necessário ter no seu ambiente as seguintes versões:

Node: v18.17.1

NPM: 10.1.0

ORM: 0.3.20

### Banco de dados

1. Tenha um banco de dados mysql intalado com um usuário.
2. Crie um .env com os seguintes dados


MYSQL_HOST="localhost"
MYSQL_PORT="3306"
MYSQL_USER="root"
MYSQL_PASSWORD="12345678"
MYSQL_DB="seucandidato"

3. No ORMConfig.ts você vai colocar synchronize: true
4. rodar npm run start:dev
5. No ORMConfig.ts você vai colocar synchronize: false

#### ERROS POSSÍVEIS

##### ER_NOT_SUPPORTED_AUTH_MODE: Client does not support authentication protocol requested by server; consider upgrading MySQL client

Executar trocando pela sua senha e usuario:

ALTER USER 'user'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';
flush privileges;

Erro ocorre pela utilização do mysql ao inves do mysql2.

## Running the app

bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod


## Test

bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov


# Commit

Os testes são executados antes de todo commit, caso de algum erro, verificar se os testes estão todos corretos e com cobertura alta.

Para commitar no repositorio é recomendado seguir o seguinte padrão

seucandidato/seu-candidato-front#2 - mensagem

ex.:

seucandidato/seu-candidato-front#2 - correção da issue

Assim, sua correçào sera linkada automaticamente com a issue.

# Build

A criação da imagem é gerada seguindo referências que estão no Dockerfile na raiz desse projeto.

# Deploy

## Desenvolvimento

## Plugins recomendados:
- T O D O (sem espaço) Tree

## Testes

- [ ] Casos de sucesso
- [ ] Casos de erros
- [ ] App com validadores
- [ ] Nome sobre o que o teste faz