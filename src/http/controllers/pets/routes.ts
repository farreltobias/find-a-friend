import { FastifyInstance } from 'fastify'

import { details } from './details'
import { verifyJwt } from '@/http/middlewares/verify-jwt'
import { create } from './create'

export async function petsRoutes(app: FastifyInstance) {
  app.get('/pets/:petId', details)

  /** Authenticated */
  app.post('/pets', { onRequest: [verifyJwt] }, create)
}
