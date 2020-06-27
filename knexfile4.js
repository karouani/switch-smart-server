require ('custom-env').env()

module.exports = {
  development: {
    client: 'pg',
    connection: {
      user: process.env.LOCAL_DB_4_USER,   
      password: process.env.LOCAL_DB_4_PASS,
      host: process.env.LOCAL_DB_4_HOST, 
      port:  process.env.LOCAL_DB_4_PORT,
      database: process.env.LOCAL_DB_4_NAME,
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