import { pino } from 'pino'

const logger = pino()

export const handle = async (event) => {
  logger.info(event, 'Incoming event')
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Hello there stranger'
    }),
  };
}
