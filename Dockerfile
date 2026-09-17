FROM node:20

ARG API_BASE_URL

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN echo "window.APP_CONFIG = { API_BASE_URL: '${API_BASE_URL}' };" > src/config.js

RUN npm run build

EXPOSE 8000

CMD ["python3", "-m", "http.server", "8000", "--directory", "dist"]