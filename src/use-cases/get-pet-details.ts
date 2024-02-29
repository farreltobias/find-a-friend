import { Pet } from '@prisma/client'
import { PetsRepository } from '../repositories/pets-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { OrgsRepository } from '../repositories/orgs-repository'

interface GetPetDetailsUseCaseRequest {
  petId: string
}

interface GetPetDetailsUseCaseResponse {
  pet: Pet
  organization: {
    name: string
    city: string
    neighborhood: string
    state: string
    street: string
    zip: string
    latitude: number
    longitude: number
    whatsApp: string
  }
}

export class GetPetDetailsUseCase {
  constructor(
    private petsRepository: PetsRepository,
    private orgsRepository: OrgsRepository,
  ) {}

  async execute({
    petId,
  }: GetPetDetailsUseCaseRequest): Promise<GetPetDetailsUseCaseResponse> {
    const pet = await this.petsRepository.findById(petId)

    if (!pet) {
      throw new ResourceNotFoundError()
    }

    const org = await this.orgsRepository.findById(pet.org_id)

    if (!org) {
      throw new ResourceNotFoundError()
    }

    const organization = {
      name: org.name,
      city: org.city,
      neighborhood: org.neighborhood,
      state: org.state,
      street: org.street,
      zip: org.zip,
      latitude: org.latitude,
      longitude: org.longitude,
      whatsApp: org.whatsApp,
    }

    return {
      pet,
      organization,
    }
  }
}
