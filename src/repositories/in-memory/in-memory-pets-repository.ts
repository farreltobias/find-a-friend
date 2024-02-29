import { Pet, Prisma } from '@prisma/client'
import { randomUUID } from 'node:crypto'

import { PetsRepository, SearchQuery } from '../pets-repository'
import { InMemoryOrgsRepository } from './in-memory-orgs-repository'

export class InMemoryPetsRepository implements PetsRepository {
  public items: Pet[] = []

  constructor(private orgsRepository: InMemoryOrgsRepository) {}

  async search({ city, age, energy, independence, size, type }: SearchQuery) {
    const orgsByCity = this.orgsRepository.items.filter((org) => {
      return org.city === city
    })

    const pets = this.items.filter((pet) => {
      return (
        orgsByCity.some((org) => org.id === pet.org_id) &&
        (age ? pet.age === age : true) &&
        (energy ? pet.energy === energy : true) &&
        (independence ? pet.independence === independence : true) &&
        (size ? pet.size === size : true) &&
        (type ? pet.type === type : true)
      )
    })

    return pets
  }

  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet: Pet = {
      id: data.id ?? randomUUID(),
      name: data.name,
      about: data.about || null,
      type: data.type,
      age: data.age,
      size: data.size,
      energy: data.energy,
      environment: data.environment,
      independence: data.independence,
      org_id: data.org_id,
    }

    this.items.push(pet)

    return pet
  }
}
