import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { app } from '@/app'

describe('Refresh token (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to refresh a token', async () => {
    await request(app.server).post('/orgs').send({
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

    const authResponse = await request(app.server).post('/sessions').send({
      email: 'johndoe@example.com',
      password: 'password',
    })

    const cookies = authResponse.get('Set-Cookie')

    const response = await request(app.server)
      .patch('/token/refresh')
      .set('Cookie', cookies)

    expect(response.status).toEqual(200)
    expect(response.body).toEqual({
      token: expect.any(String),
    })

    expect(response.get('Set-Cookie')).toEqual([
      expect.stringContaining('refreshToken='),
    ])
  })
})
