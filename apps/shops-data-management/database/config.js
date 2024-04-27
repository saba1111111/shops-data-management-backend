module.exports = {
  development: {
    schema: process.env.SHOPS_DATA_MANAGEMENT_DB_SCHEMA,
    dialect: process.env.SHOPS_DATA_MANAGEMENT_DB_DIALECT,
    host: process.env.SHOPS_DATA_MANAGEMENT_DB_HOST,
    port: process.env.SHOPS_DATA_MANAGEMENT_DB_PORT,
    username: process.env.SHOPS_DATA_MANAGEMENT_DB_USERNAME,
    password: process.env.SHOPS_DATA_MANAGEMENT_DB_PASSWORD,
    database: process.env.SHOPS_DATA_MANAGEMENT_DB_DATABASE,
  },
  production: {
    schema: process.env.SHOPS_DATA_MANAGEMENT_DB_SCHEMA,
    dialect: process.env.SHOPS_DATA_MANAGEMENT_DB_DIALECT,
    host: process.env.SHOPS_DATA_MANAGEMENT_DB_HOST,
    port: process.env.SHOPS_DATA_MANAGEMENT_DB_PORT,
    username: process.env.SHOPS_DATA_MANAGEMENT_DB_USERNAME,
    password: process.env.SHOPS_DATA_MANAGEMENT_DB_PASSWORD,
    database: process.env.SHOPS_DATA_MANAGEMENT_DB_DATABASE,
  },
};
