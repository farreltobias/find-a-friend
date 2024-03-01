import { FastifyReply, FastifyRequest } from 'fastify'
import { Type, Age, Size, Energy, Independence } from '@prisma/client'
import { z } from 'zod'

import { makeSearchPetsUseCase } from '@/use-cases/factories/make-search-pets-use-case'

export async function search(request: FastifyRequest, reply: FastifyReply) {
  const registerParamsSchema = z.object({
    city: z.string(),
    type: z.nativeEnum(Type).optional(),
    age: z.nativeEnum(Age).optional(),
    size: z.nativeEnum(Size).optional(),
    energy: z.nativeEnum(Energy).optional(),
    independence: z.nativeEnum(Independence).optional(),
  })

  const { city, age, energy, independence, size, type } =
    registerParamsSchema.parse(request.query)

  const getPetDetailsUseCase = makeSearchPetsUseCase()

  const { pets } = await getPetDetailsUseCase.execute({
    city,
    age,
    energy,
    independence,
    size,
    type,
  })

  return reply.status(200).send({
    pets,
  })
}
