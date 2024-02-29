import { Org } from '@prisma/client'
import { hash } from 'bcryptjs'

import { OrgsRepository } from '../repositories/orgs-repository'
import { OrgAlreadyExistsError } from './errors/org-already-exists-error'

interface RegisterOrgUseCaseRequest {
  name: string
  email: string
  author_name: string
  password: string
  city: string
  neighborhood: string
  state: string
  street: string
  zip: string
  latitude: number
  longitude: number
  whatsApp: string
}

interface RegisterOrgUseCaseResponse {
  org: Org
}

export class RegisterOrgUseCase {
  constructor(private orgsRepository: OrgsRepository) {}

  async execute({
    name,
    email,
    author_name,
    password,
    city,
    neighborhood,
    state,
    street,
    zip,
    latitude,
    longitude,
    whatsApp,
  }: RegisterOrgUseCaseRequest): Promise<RegisterOrgUseCaseResponse> {
    const orgWithSameEmail = await this.orgsRepository.findByEmail(email)

    if (orgWithSameEmail) {
      throw new OrgAlreadyExistsError()
    }

    const password_hash = await hash(password, 6)

    const org = await this.orgsRepository.create({
      name,
      email,
      author_name,
      password_hash,
      city,
      neighborhood,
      state,
      street,
      zip,
      latitude,
      longitude,
      whatsApp,
    })

    return {
      org,
    }
  }
}
