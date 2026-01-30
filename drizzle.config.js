require("dotenv").config();
const { defineConfig } = require("drizzle-kit");

const config = defineConfig({
  schema: "./models/index.js",
  out: "./migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL, 
  },
});
module.exports = config;