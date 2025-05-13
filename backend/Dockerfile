FROM node:18

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build
RUN npx prisma generate

ARG PORT=5000
ENV PORT=${PORT}
EXPOSE ${PORT}
CMD ["npm", "run", "start"]