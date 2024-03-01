import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { OrgsRepository } from '../repositories/orgs-repository'

interface GetOrgDetailsUseCaseRequest {
  orgId: string
}

interface GetOrgDetailsUseCaseResponse {
  organization: {
    id: string
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

export class GetOrgDetailsUseCase {
  constructor(private orgsRepository: OrgsRepository) {}

  async execute({
    orgId,
  }: GetOrgDetailsUseCaseRequest): Promise<GetOrgDetailsUseCaseResponse> {
    const org = await this.orgsRepository.findById(orgId)

    if (!org) {
      throw new ResourceNotFoundError()
    }

    const organization = {
      id: org.id,
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
      organization,
    }
  }
}
