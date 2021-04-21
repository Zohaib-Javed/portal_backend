const winston = require('winston');
 
const fileLogger=(data)=>{
  const logger = winston.createLogger({
    level: 'error',
    format: winston.format.json(),
    defaultMeta: { file: data.fileName },
    transports: [
      new winston.transports.File({ filename: 'error.log', level: 'error' }),
    ],
  });
  logger.log('error', data.error, 'my string');
}

module.exports={fileLogger}