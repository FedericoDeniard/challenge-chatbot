FROM node:22.2.0

WORKDIR /app

COPY package*.json ./
COPY frontend/package*.json ./frontend/
COPY backend/package*.json ./backend/

RUN npm install
RUN npm install -w frontend
RUN npm install -w backend

COPY . .

RUN npm install -g typescript


ENV PORT=3000


EXPOSE 3000 5173
