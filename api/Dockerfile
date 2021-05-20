FROM node:14
WORKDIR /user/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
COPY .env ./dist/
COPY private.pem ./dist/
COPY public.pem ./dist/
WORKDIR ./dist
EXPOSE 5000
CMD node src/app.js