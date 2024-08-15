module.exports = {
  dbConnection: {
    url: 'mongodb://localhost:27017/restaurant',
    // host: 'localhost',
    // username: 'admin',
    // password: '00password#',
    // port: 6381,
    // database: 'restaurant',
   // entities: [`${__dirname}/src/**/**.entity{.ts,.js}`],
  },
  redisConnection: {
    host: 'localhost',
    port: 6379,
    database: 'restaurant',
  },
}