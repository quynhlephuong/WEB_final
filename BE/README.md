# Installation Required

- Docker: 
  - Mac: [Here](https://docs.docker.com/desktop/setup/install/mac-install/)
  - Windows: [Here](https://docs.docker.com/desktop/setup/install/windows-install/)
- Node version 20: [Here](https://nodejs.org/dist/v20.19.2/node-v20.19.2-x64.msi)

# Usage
# For running instantly
```bash
docker compose build
docker compose up
```

# For running locally
```bash
docker compose build 
docker compose up postgres

# If u are using Windows and using Powershell
Copy-Item .env.dev .env
# If u are using Macbook or MacOS Operation
cp .env.dev .env

npm i
npm run setup
npm run start:dev

```

## Then direct to [localhost:3333/docs](localhost:3333/docs) for API documents
