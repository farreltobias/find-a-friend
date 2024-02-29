import { Age, Energy, Independence, Pet, Size, Type } from '@prisma/client'
import { PetsRepository } from '../repositories/pets-repository'

interface SearchPetsUseCaseRequest {
  city: string
  type?: Type
  age?: Age
  energy?: Energy
  size?: Size
  independence?: Independence
  page?: number
}

interface SearchPetsUseCaseResponse {
  pets: Pet[]
}

export class SearchPetsUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    city,
    type,
    age,
    energy,
    independence,
    size,
  }: SearchPetsUseCaseRequest): Promise<SearchPetsUseCaseResponse> {
    const pets = await this.petsRepository.search({
      city,
      type,
      age,
      energy,
      size,
      independence,
    })

    return {
      pets,
    }
  }
}
