import winston from 'winston'

const errorFile = './log/error.log'
const combinedFile = './log/combined.log'

const logger = winston.createLogger({})

if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.File({ filename: errorFile, level: 'error' }))
  logger.add(new winston.transports.File({ filename: combinedFile }))
  logger.add(
    // new winston.transports.Console({
    //   format: winston.format.simple(),
    // })
    new winston.transports.Console({
      format: winston.format.prettyPrint(),
    })
  )
}

export const Log = (
  level: 'info' | 'error' | 'success' | 'warning',
  message?: string,
  service: string = 'default'
) => {
  const date = new Date().toLocaleDateString()
  const time = new Date().toLocaleTimeString()

  logger.log({ level, message, service, time: `${time} ${date}` })
}

export default logger
