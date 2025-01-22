import { pino } from 'pino'

const logger = pino()

export const handle = async (event) => {
  logger.info(event, 'Incoming event')
  return {
    statusCode: 200,
    body: {
      message: 'Hello there stranger'
    },
  };
}
