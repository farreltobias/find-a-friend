import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { makeCreatePetUseCase } from '@/use-cases/factories/make-create-pet-use-case'
import {
  Age,
  Energy,
  Environment,
  Independence,
  Size,
  Type,
} from '@prisma/client'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    about: z.string().nullable(),
    type: z.nativeEnum(Type),
    age: z.nativeEnum(Age),
    size: z.nativeEnum(Size),
    energy: z.nativeEnum(Energy),
    environment: z.nativeEnum(Environment),
    independence: z.nativeEnum(Independence),
  })

  const { name, about, type, age, size, energy, environment, independence } =
    registerBodySchema.parse(request.body)

  try {
    const createPetUseCase = makeCreatePetUseCase()

    await createPetUseCase.execute({
      name,
      about,
      type,
      age,
      size,
      energy,
      environment,
      independence,
      orgId: request.user.sub,
    })
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(400).send({ message: err.message })
    }

    throw err
  }

  return reply.status(201).send()
}
