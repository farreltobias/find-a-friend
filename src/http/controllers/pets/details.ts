import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { makeGetOrgDetailsUseCase } from '@/use-cases/factories/make-get-org-details-use-case'
import { makeGetPetDetailsUseCase } from '@/use-cases/factories/make-get-pet-details-use-case'

export async function details(request: FastifyRequest, reply: FastifyReply) {
  const registerParamsSchema = z.object({
    petId: z.string(),
  })

  const { petId } = registerParamsSchema.parse(request.params)

  try {
    const getPetDetailsUseCase = makeGetPetDetailsUseCase()
    const getOrgDetailsUseCase = makeGetOrgDetailsUseCase()

    const { pet } = await getPetDetailsUseCase.execute({ petId })
    const { organization } = await getOrgDetailsUseCase.execute({
      orgId: pet.org_id,
    })

    return reply.status(200).send({
      pet,
      organization,
    })
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(404).send({
        message: err.message,
      })
    }

    throw err
  }
}
