require ('custom-env').env()

module.exports = {
  development: {
    client: 'pg',
    connection: {
      user: process.env.DB_4_USER,   
      password: process.env.DB_4_PASS,
      host: process.env.DB_4_HOST, 
      port:  process.env.DB_4_PORT,
      database: process.env.DB_4_NAME,
      ssl: true
    },
    migrations: {
      directory: __dirname + '/db/4/migrations',
    },
    seeds: {
      directory: __dirname + '/db/4/seeds',
    },
  },
};