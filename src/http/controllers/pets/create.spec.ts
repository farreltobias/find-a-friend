import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import { app } from '@/app'
import { createAndAuthenticateOrg } from '@/utils/create-and-authenticate-org'

describe('Create Pet (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create a pet', async () => {
    const { token } = await createAndAuthenticateOrg(app)

    const response = await request(app.server)
      .post(`/pets`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Rex',
        about: 'A very good dog',
        type: 'DOG',
        age: 'ADULT',
        size: 'MEDIUM',
        energy: 'HIGH',
        environment: 'INDOOR',
        independence: 'HIGH',
      })

    expect(response.status).toEqual(201)
  })
})
