import { Org, Prisma } from '@prisma/client'
import { randomUUID } from 'node:crypto'

import { OrgsRepository } from '../orgs-repository'

export class InMemoryOrgsRepository implements OrgsRepository {
  public items: Org[] = []

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
