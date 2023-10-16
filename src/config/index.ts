const config = {
  mongoUri: process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/ecomdb",
  apiUrl: process.env.API_URL || "http://localhost:3000/api",
  nextauthSecret: process.env.NEXTAUTH_SECRET || "ghjsackodnfwra",
};

export default config;
