FROM node:20

WORKDIR /src

RUN npm install -g pnpm

COPY package.json ./

RUN pnpm install --no-frozen-lockfile

COPY . .

EXPOSE 3004

CMD ["sh", "-c", "pnpm run setup && pnpm run start"]