import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { app } from '@/app'

describe('Register (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to register', async () => {
    const response = await request(app.server).post('/orgs').send({
      name: 'JavaScript Ong',
      email: 'johndoe@example.com',
      author_name: 'John Doe',
      password: 'password',
      city: 'Fake City',
      neighborhood: 'Fake Neighborhood',
      state: 'Fake State',
      street: 'Fake Street',
      zip: '12345-678',
      latitude: 14.4095261,
      longitude: -51.31668,
      whatsApp: '(43) 98765-4321',
    })

    expect(response.status).toEqual(201)
  })
})
