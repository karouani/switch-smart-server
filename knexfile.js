require ('custom-env').env()

module.exports = {
  development: {
    client: 'pg',
    connection: {
      user: process.env.LOCAL_DB_USER,   
      password: process.env.LOCAL_DB_PASS,
      host: process.env.LOCAL_DB_HOST,
      port:  process.env.LOCAL_DB_PORT,
      database: process.env.LOCAL_DB_NAME,
      ssl: false
    },
    migrations: { 
      directory: __dirname + '/db/migrations', 
    },
    seeds: {
      directory: __dirname + '/db/seeds',
    },
  },
};
 