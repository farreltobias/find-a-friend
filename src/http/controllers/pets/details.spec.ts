import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { app } from '@/app'
import { hash } from 'bcryptjs'
import { prisma } from '@/lib/prisma'

describe('Pet Details (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to get pet and org details', async () => {
    const org = await prisma.org.create({
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

    const pet = await prisma.pet.create({
      data: {
        name: 'Rex',
        about: 'A very good dog',
        type: 'DOG',
        age: 'ADULT',
        size: 'MEDIUM',
        energy: 'HIGH',
        environment: 'INDOOR',
        independence: 'HIGH',
        org_id: org.id,
      },
    })

    const response = await request(app.server).get(`/pets/${pet.id}`)

    expect(response.status).toEqual(200)
    expect(response.body).toEqual({
      pet: expect.objectContaining({
        id: pet.id,
      }),
      organization: expect.objectContaining({
        id: org.id,
      }),
    })
  })
})
