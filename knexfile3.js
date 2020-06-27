require ('custom-env').env()

module.exports = {
  development: {
    client: 'pg',
    connection: {
      user: process.env.DB_3_USER,   
      password: process.env.DB_3_PASS,
      host: process.env.DB_3_HOST, 
      port:  process.env.DB_3_PORT,
      database: process.env.DB_3_NAME,
      ssl: true
    },
    migrations: {
      directory: __dirname + '/db/3/migrations',
    },
    seeds: {
      directory: __dirname + '/db/3/seeds',
    },
  },
};