import { beforeEach, describe, expect, it } from 'vitest'
import { hash } from 'bcryptjs'

import { InMemoryPetsRepository } from '../repositories/in-memory/in-memory-pets-repository'
import { InMemoryOrgsRepository } from '../repositories/in-memory/in-memory-orgs-repository'
import { GetPetDetailsUseCase } from './get-pet-details'

describe('Get Pet Details Use Case', () => {
  let orgsRepository: InMemoryOrgsRepository
  let petsRepository: InMemoryPetsRepository
  let sut: GetPetDetailsUseCase

  beforeEach(async () => {
    orgsRepository = new InMemoryOrgsRepository()
    petsRepository = new InMemoryPetsRepository(orgsRepository)
    sut = new GetPetDetailsUseCase(petsRepository)

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
      zip: '12345-678',
      latitude: 14.4095261,
      longitude: -51.31668,
      whatsApp: '(43) 98765-4321',
    })
  })

  it('should be able to get Pet details for adoption', async () => {
    const petCreated = await petsRepository.create({
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

    const { pet } = await sut.execute({
      petId: petCreated.id,
    })

    expect(pet.id).toEqual(petCreated.id)
  })
})
