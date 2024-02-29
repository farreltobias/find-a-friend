import {
  Age,
  Energy,
  Independence,
  Pet,
  Prisma,
  Size,
  Type,
} from '@prisma/client'

export interface SearchQuery
  extends Partial<{
    type: Type
    age: Age
    energy: Energy
    size: Size
    independence: Independence
  }> {
  city: string
}

export interface PetsRepository {
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
  search(query: SearchQuery): Promise<Pet[]>
}
