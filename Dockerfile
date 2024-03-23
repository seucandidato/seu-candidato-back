# Estágio de construção
FROM node:18 as build

# Define o diretório de trabalho como /app
WORKDIR /app

# Copia o arquivo package.json para o diretório de trabalho
COPY . .

# Instala as dependências do projeto
RUN npm install

# Copia todos os arquivos do projeto para o diretório de trabalho
COPY . .

# Compila o projeto Angular para produção
RUN npm run build --prod

# Estágio de produção
FROM nginx:alpine

# Copia os arquivos de build do estágio de construção para o diretório de publicação do Nginx
# Nesse ponto também verificar o caminho da raiz do projeto, onde está o index.html
COPY --from=build /app/dist /usr/share/nginx/html/

# Expor a porta 80 para fora do contêiner
EXPOSE 80

# Comando para iniciar o servidor Nginx em primeiro plano quando o contêiner for executado
CMD ["nginx", "-g", "daemon off;"]

# Após tudo isso rodar o comando para buildar a imagem
# docker buildx build -t e-seguro-pay:v1 . 

# Em seguinda vai ter que rodar a imagem docker em um container com o comando abaixo
# docker run -d --name e-seguro-pay -p 8099:80 9a437fb7984064c22879ea3b9ae0b7fb0de7ec455d913fe556be8147440d34a5
# e-seguro-pay = Nome do container 
# 8099:80 8099 é a porta que vai abrir o projeto localhost:8099
# 9a437fb7984064c22879ea3b9ae0b7fb0de7ec455d913fe556be8147440d34a5 isso é o ID da imagem, tem como copiar do docker
