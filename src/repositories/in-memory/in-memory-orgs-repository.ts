import { Org, Prisma } from '@prisma/client'
import { OrgsRepository } from '../orgs-repository'
import { randomUUID } from 'crypto'

export class InMemoryOrgsRepository implements OrgsRepository {
  private items: Org[] = []

  async findById(id: string) {
    const org = this.items.find((item) => item.id === id)

    if (!org) {
      return null
    }

    return org
  }

  async create(data: Prisma.OrgUncheckedCreateInput) {
    const org: Org = {
      id: data.id ?? randomUUID(),
      name: data.name,
      email: data.email,
      author_name: data.author_name,
      password_hash: data.password_hash,
      whatsApp: data.whatsApp,
      city: data.city,
      neighborhood: data.neighborhood,
      state: data.state,
      street: data.street,
      zip: data.zip,
      latitude: data.latitude,
      longitude: data.longitude,
    }

    this.items.push(org)

    return org
  }
}
