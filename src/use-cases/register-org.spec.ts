import { beforeEach, describe, expect, it } from 'vitest'
import { compare } from 'bcryptjs'

import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { OrgAlreadyExistsError } from './errors/org-already-exists-error'
import { RegisterOrgUseCase } from './register-org'

describe('Register Org Use Case', () => {
  let orgsRepository: InMemoryOrgsRepository
  let sut: RegisterOrgUseCase

  beforeEach(async () => {
    orgsRepository = new InMemoryOrgsRepository()
    sut = new RegisterOrgUseCase(orgsRepository)
  })

  it('should be able to register a ONG', async () => {
    const { org } = await sut.execute({
      name: 'JavaScript Ong',
      email: 'johndoe@example.com',
      author_name: 'John Doe',
      password: 'password',
      city: 'Fake City',
      neighborhood: 'Fake Neighborhood',
      state: 'Fake State',
      street: 'Fake Street',
      zip: '12345678',
      latitude: 14.4095261,
      longitude: -51.31668,
      whatsApp: '123456789',
    })

    expect(org.id).toEqual(expect.any(String))
  })

  it('should hash password upon registration', async () => {
    const { org } = await sut.execute({
      name: 'JavaScript Ong',
      email: 'johndoe@example.com',
      author_name: 'John Doe',
      password: 'password',
      city: 'Fake City',
      neighborhood: 'Fake Neighborhood',
      state: 'Fake State',
      street: 'Fake Street',
      zip: '12345678',
      latitude: 14.4095261,
      longitude: -51.31668,
      whatsApp: '123456789',
    })

    const isPasswordCorrectlyHashed = await compare(
      'password',
      org.password_hash,
    )

    expect(isPasswordCorrectlyHashed).toEqual(true)
  })

  it('should not allow two ONGs with the same email', async () => {
    await sut.execute({
      name: 'JavaScript Ong',
      email: 'johndoe@example.com',
      author_name: 'John Doe',
      password: 'password',
      city: 'Fake City',
      neighborhood: 'Fake Neighborhood',
      state: 'Fake State',
      street: 'Fake Street',
      zip: '12345678',
      latitude: 14.4095261,
      longitude: -51.31668,
      whatsApp: '123456789',
    })

    await expect(() =>
      sut.execute({
        name: 'JavaScript Ong',
        email: 'johndoe@example.com',
        author_name: 'John Doe',
        password: 'password',
        city: 'Fake City',
        neighborhood: 'Fake Neighborhood',
        state: 'Fake State',
        street: 'Fake Street',
        zip: '12345678',
        latitude: 14.4095261,
        longitude: -51.31668,
        whatsApp: '123456789',
      }),
    ).rejects.toBeInstanceOf(OrgAlreadyExistsError)
  })
})
