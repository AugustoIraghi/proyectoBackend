import winston from 'winston';

const colors = {
    debug: 'white',
    http: 'green',
    info: 'blue',
    warning: 'yellow',
    error: 'magenta',
    fatal: 'red',
};

const levels = {
    debug: 0,
    http: 1,
    info: 2,
    warning: 3,
    error: 4,
    fatal: 5,
};

winston.addColors(colors);
const createLogger = env => {
    if (env === 'PROD') {
        return winston.createLogger({
            levels,
            transports: [
                new winston.transports.Console({
                    level: 'info',
                    format: winston.format.combine(
                        winston.format.timestamp(),
                        winston.format.colorize(),
                        winston.format.simple(),
                    ),
                }),
                new winston.transports.File({
                    filename: '../logs/errors.log',
                    level: 'error',
                    format: winston.format.combine(
                        winston.format.timestamp(),
                        winston.format.json(),
                    ),
                }),
            ],
        });
    } else {
        return winston.createLogger({
            levels,
            transports: [
                new winston.transports.Console({
                    level: 'debug',
                    format: winston.format.combine(
                        winston.format.timestamp(),
                        winston.format.colorize(),
                        winston.format.simple(),
                    ),
                }),
            ],
        });
    }
}

const envLogger = createLogger(process.env.NODE_ENV);

export default envLogger;