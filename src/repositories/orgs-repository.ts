import { Org, Prisma } from '@prisma/client'

export interface OrgsRepository {
  findById(id: string): Promise<Org | null>
  create(data: Prisma.OrgUncheckedCreateInput): Promise<Org>
}