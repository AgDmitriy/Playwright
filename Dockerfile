FROM mcr.microsoft.com/playwright:v1.50.1-noble

WORKDIR /pw-test

COPY package*.json ./

RUN npm install

COPY . .

CMD ["npx", "playwright", "test"]