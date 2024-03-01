import { FastifyInstance } from 'fastify'

import { details } from './details'

export async function petsRoutes(app: FastifyInstance) {
  app.get('/pets/:petId', details)
}
