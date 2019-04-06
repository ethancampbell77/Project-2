require("dotenv").config();

module.exports = {
  "development": {
    "username": process.env.DB_USERID,
    "password": process.env.DB_PASSWORD,
    "database": "user",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "use_environment_variable": "JAWSDB_URL",
    "dialect": "mysql"
  }
}