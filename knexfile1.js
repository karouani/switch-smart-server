require ('custom-env').env()

module.exports = {
  development: {
    client: 'pg',
    connection: {
      user: process.env.LOCAL_DB_1_USER,   
      password: process.env.LOCAL_DB_1_PASS,
      host: process.env.LOCAL_DB_1_HOST,
      port:  process.env.LOCAL_DB_1_PORT,
      database: process.env.LOCAL_DB_1_NAME,
      ssl: true
    },
    migrations: {
      directory: __dirname + '/db/1/migrations',
    },
    seeds: {
      directory: __dirname + '/db/1/seeds',
    },
  },
};
 