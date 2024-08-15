module.exports = {
  dbConnection: {
    url: 'mongodb://mongo:27017/restaurant',
    // host: 'localhost',
    // username: 'admin',
    // password: '00password#',
    // port: 6381,
    // database: 'restaurant',
   // entities: [`${__dirname}/src/**/**.entity{.ts,.js}`],
  },
  redisConnection: {
    host: 'redis',
    port: 6379,
    database: 'restaurant',
  },
}