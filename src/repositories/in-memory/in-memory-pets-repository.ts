import { Pet, Prisma } from '@prisma/client'
import { PetsRepository } from '../pets-repository'
import { randomUUID } from 'crypto'

export class InMemoryPetsRepository implements PetsRepository {
  private items: Pet[] = []

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
