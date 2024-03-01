import { OrgAlreadyExistsError } from '@/use-cases/errors/org-already-exists-error'
import { makeRegisterOrgUseCase } from '@/use-cases/factories/make-register-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    author_name: z.string(),
    password: z.string().min(6),
    city: z.string(),
    neighborhood: z.string(),
    state: z.string(),
    street: z.string(),
    zip: z.string().refine((value) => {
      return /^\d{5}-\d{3}$/.test(value)
    }),
    latitude: z.coerce.number().refine((value) => {
      return Math.abs(value) <= 90
    }),
    longitude: z.coerce.number().refine((value) => {
      return Math.abs(value) <= 180
    }),
    whatsApp: z.string().refine((value) => {
      return /^\(\d{2}\)\s\d{4,5}-\d{4}$/.test(value)
    }),
  })

  const {
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
  } = registerBodySchema.parse(request.body)

  try {
    const registerOrgUseCase = makeRegisterOrgUseCase()

    await registerOrgUseCase.execute({
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
    })
  } catch (err) {
    if (err instanceof OrgAlreadyExistsError) {
      return reply.status(400).send({ message: err.message })
    }

    throw err
  }

  return reply.status(201).send()
}
