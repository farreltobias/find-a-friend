import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { OrgsRepository } from '../repositories/orgs-repository'
import { Org } from '@prisma/client'

interface GetOrgDetailsUseCaseRequest {
  orgId: string
}

interface GetOrgDetailsUseCaseResponse {
  organization: Omit<Org, 'password_hash'>
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

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password_hash, ...organization } = org

    return {
      organization,
    }
  }
}
