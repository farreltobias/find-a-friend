import { beforeEach, describe, expect, it } from 'vitest'
import { hash } from 'bcryptjs'

import { InMemoryOrgsRepository } from '../repositories/in-memory/in-memory-orgs-repository'
import { GetOrgDetailsUseCase } from './get-org-details'

describe('Get Org Details Use Case', () => {
  let orgsRepository: InMemoryOrgsRepository
  let sut: GetOrgDetailsUseCase

  beforeEach(async () => {
    orgsRepository = new InMemoryOrgsRepository()
    sut = new GetOrgDetailsUseCase(orgsRepository)
  })

  it('should be able to get Organization details for adoption', async () => {
    const orgCreated = await orgsRepository.create({
      id: 'org-id',
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
    })

    const { organization } = await sut.execute({
      orgId: orgCreated.id,
    })

    expect(organization.id).toEqual(orgCreated.id)
    expect(organization).toEqual(
      expect.objectContaining({
        name: expect.any(String),
        city: expect.any(String),
        neighborhood: expect.any(String),
        state: expect.any(String),
        street: expect.any(String),
        zip: expect.any(String),
        latitude: expect.any(Number),
        longitude: expect.any(Number),
        whatsApp: expect.any(String),
      }),
    )
  })
})
