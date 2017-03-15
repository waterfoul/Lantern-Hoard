const winston = require('winston');
const args = require('./args');

console.log(args.verbose >= 2 ? 'debug' : args.verbose === 1 ? 'info' : 'warn');
const logger = new winston.Logger({
  transports: [
    new (winston.transports.Console)({
      json: true,
      colorize: true,
      level: args.verbose === 1 ? 'info' : 'warn'
    }),
  ],
});

module.exports = logger;
