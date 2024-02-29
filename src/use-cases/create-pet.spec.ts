import { beforeEach, describe, expect, it } from 'vitest'
import { hash } from 'bcryptjs'

import { CreatePetUseCase } from './create-pet'
import { InMemoryPetsRepository } from '../repositories/in-memory/in-memory-pets-repository'
import { InMemoryOrgsRepository } from '../repositories/in-memory/in-memory-orgs-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

describe('Create Pet Use Case', () => {
  let orgsRepository: InMemoryOrgsRepository
  let petsRepository: InMemoryPetsRepository
  let sut: CreatePetUseCase

  beforeEach(async () => {
    orgsRepository = new InMemoryOrgsRepository()
    petsRepository = new InMemoryPetsRepository(orgsRepository)
    sut = new CreatePetUseCase(petsRepository, orgsRepository)

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

  it('should be able to create a pet', async () => {
    const { pet } = await sut.execute({
      name: 'Rex',
      about: 'A very good dog',
      type: 'DOG',
      age: 'ADULT',
      size: 'MEDIUM',
      energy: 'HIGH',
      environment: 'INDOOR',
      independence: 'HIGH',
      orgId: 'org-id',
    })

    expect(pet.id).toEqual(expect.any(String))
  })

  it('should not be able to create a pet with an invalid org', async () => {
    await expect(
      sut.execute({
        name: 'Rex',
        about: 'A very good dog',
        type: 'DOG',
        age: 'ADULT',
        size: 'MEDIUM',
        energy: 'HIGH',
        environment: 'INDOOR',
        independence: 'HIGH',
        orgId: 'invalid-org-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
