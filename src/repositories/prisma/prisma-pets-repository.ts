import { prisma } from '@/lib/prisma'
import { PetsRepository, SearchQuery } from '../pets-repository'
import { Prisma } from '@prisma/client'

export class PrismaPetsRepository implements PetsRepository {
  async search({ city, type, energy, independence, size, age }: SearchQuery) {
    const pets = await prisma.pet.findMany({
      where: {
        type,
        energy,
        independence,
        size,
        age,
        org: {
          city,
        },
      },
    })

    return pets
  }

  async findById(id: string) {
    const pet = await prisma.pet.findUnique({
      where: { id },
    })

    return pet
  }

  async create({
    name,
    about,
    age,
    energy,
    environment,
    independence,
    size,
    type,
    org_id,
  }: Prisma.PetUncheckedCreateInput) {
    const pet = await prisma.pet.create({
      data: {
        name,
        about,
        age,
        energy,
        environment,
        independence,
        size,
        type,
        org_id,
      },
    })

    return pet
  }
}
