import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import { app } from '@/app'
import { createAndAuthenticateOrg } from '@/utils/create-and-authenticate-org'

describe('Search Pets (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to search pets by city', async () => {
    const { token } = await createAndAuthenticateOrg(app)
    const { token: tokenFromOrgNotIncluded } = await createAndAuthenticateOrg(
      app,
      { city: 'Other City', email: 'johndoe2@example.com' },
    )

    await request(app.server)
      .post('/pets')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Rex',
        about: 'A very good dog',
        type: 'DOG',
        age: 'CUB',
        size: 'SMALL',
        energy: 'VERY_LOW',
        environment: 'INDOOR',
        independence: 'LOW',
      })

    await request(app.server)
      .post('/pets')
      .set('Authorization', `Bearer ${tokenFromOrgNotIncluded}`)
      .send({
        name: 'Emilia',
        about: 'A very good cat',
        type: 'CAT',
        age: 'ADULT',
        size: 'LARGE',
        energy: 'HIGH',
        environment: 'SPACIOUS',
        independence: 'HIGH',
      })

    const response = await request(app.server)
      .get('/pets/search')
      .query({ city: 'Fake City' })
      .send()

    expect(response.status).toEqual(200)
    expect(response.body.pets).toHaveLength(1)
    expect(response.body.pets).toEqual([
      expect.objectContaining({
        name: 'Rex',
      }),
    ])
  })
})
