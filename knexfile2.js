require ('custom-env').env()

module.exports = {
  development: {
    client: 'pg',
    connection: {
      user: process.env.DB_2_USER,   
      password: process.env.DB_2_PASS,
      host: process.env.DB_2_HOST,
      port:  process.env.DB_2_PORT,
      database: process.env.DB_2_NAME,
      ssl: true
    },
    migrations: {
      directory: __dirname + '/db/2/migrations',
    },
    seeds: {
      directory: __dirname + '/db/2/seeds',
    },
  },
};