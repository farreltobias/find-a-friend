import {
  Age,
  Energy,
  Pet,
  Size,
  Type,
  Environment,
  Independence,
} from '@prisma/client'
import { PetsRepository } from '../repositories/pets-repository'
import { OrgsRepository } from '../repositories/orgs-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface CreatePetUseCaseRequest {
  name: string
  about: string | null
  type: Type
  age: Age
  size: Size
  energy: Energy
  environment: Environment
  independence: Independence
  orgId: string
}

interface CreatePetUseCaseResponse {
  pet: Pet
}

export class CreatePetUseCase {
  constructor(
    private petsRepository: PetsRepository,
    private orgsRepository: OrgsRepository,
  ) {}

  async execute({
    name,
    about,
    type,
    age,
    size,
    energy,
    environment,
    independence,
    orgId,
  }: CreatePetUseCaseRequest): Promise<CreatePetUseCaseResponse> {
    const org = await this.orgsRepository.findById(orgId)

    if (!org) {
      throw new ResourceNotFoundError()
    }

    const pet = await this.petsRepository.create({
      name,
      about,
      type,
      age,
      size,
      energy,
      environment,
      independence,
      org_id: orgId,
    })

    return {
      pet,
    }
  }
}
