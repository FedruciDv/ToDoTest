FROM node:20

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npx prisma generate

RUN npm run build && ls dist/ -a

EXPOSE 8080

CMD ["npm", "run", "start:prod"]