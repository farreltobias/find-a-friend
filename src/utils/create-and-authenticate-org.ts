import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'
import { FastifyInstance } from 'fastify'
import request from 'supertest'

export async function createAndAuthenticateOrg(app: FastifyInstance) {
  await prisma.org.create({
    data: {
      name: 'JavaScript Ong',
      email: 'johndoe@example.com',
      author_name: 'John Doe',
      password_hash: await hash('password', 6),
      city: 'Fake City',
      neighborhood: 'Fake Neighborhood',
      state: 'Fake State',
      street: 'Fake Street',
      zip: '12345-678',
      latitude: 14.4095261,
      longitude: -51.31668,
      whatsApp: '(43) 98765-4321',
    },
  })

  const authResponse = await request(app.server).post('/sessions').send({
    email: 'johndoe@example.com',
    password: 'password',
  })

  const { token } = authResponse.body

  return {
    token,
  }
}
