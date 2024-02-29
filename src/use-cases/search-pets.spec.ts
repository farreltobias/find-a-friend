import { beforeEach, describe, expect, it } from 'vitest'
import { hash } from 'bcryptjs'

import { InMemoryPetsRepository } from '../repositories/in-memory/in-memory-pets-repository'
import { InMemoryOrgsRepository } from '../repositories/in-memory/in-memory-orgs-repository'
import { SearchPetsUseCase } from './search-pets'

describe('Search Pet Use Case', () => {
  let orgsRepository: InMemoryOrgsRepository
  let petsRepository: InMemoryPetsRepository
  let sut: SearchPetsUseCase

  beforeEach(async () => {
    orgsRepository = new InMemoryOrgsRepository()
    petsRepository = new InMemoryPetsRepository(orgsRepository)
    sut = new SearchPetsUseCase(petsRepository)

    await orgsRepository.create({
      id: 'org-id',
      name: 'JavaScript Ong',
      email: 'johndoe@example.com',
      author_name: 'John Doe',
      password_hash: await hash('password', 6),
      city: 'Fake City',
      neighborhood: 'Fake Neighborhood',
      state: 'Fake State',
      street: 'Fake Street',
      zip: '12345678',
      latitude: 14.4095261,
      longitude: -51.31668,
      whatsApp: '123456789',
    })
  })

  it('should be able to search pets by query', async () => {
    const org = await orgsRepository.create({
      name: 'TypeScript Ong',
      email: 'typescript@example.com',
      author_name: 'Johnny Doe',
      password_hash: await hash('password', 6),
      city: 'Not Included City',
      neighborhood: 'Fake Neighborhood',
      state: 'Fake State',
      street: 'Fake Street',
      zip: '12345678',
      latitude: 14.4095261,
      longitude: -51.31668,
      whatsApp: '123456789',
    })

    await petsRepository.create({
      name: 'Rex',
      about: 'A very good dog',
      type: 'DOG',
      age: 'CUB',
      size: 'SMALL',
      energy: 'VERY_LOW',
      environment: 'INDOOR',
      independence: 'LOW',
      org_id: 'org-id',
    })

    await petsRepository.create({
      name: 'Emilia',
      about: 'A very good cat',
      type: 'CAT',
      age: 'ADULT',
      size: 'LARGE',
      energy: 'HIGH',
      environment: 'SPACIOUS',
      independence: 'HIGH',
      org_id: org.id,
    })

    const { pets } = await sut.execute({
      city: 'Fake City',
      type: 'DOG',
      age: 'CUB',
      size: 'SMALL',
      energy: 'VERY_LOW',
      independence: 'LOW',
    })

    expect(pets).toHaveLength(1)
    expect(pets).toEqual([
      expect.objectContaining({
        name: 'Rex',
      }),
    ])
  })
})
