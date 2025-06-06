interface Config {
  jwtSecret: string;
  jwtExpiration: string;
  refreshTokenExpiration: string;
}

const config: Config = {
  jwtSecret: process.env.JWT_SECRET || '',
  jwtExpiration: '1d',
  refreshTokenExpiration: '7d',
};

export default config;
