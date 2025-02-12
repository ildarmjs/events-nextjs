import { z } from 'zod';
import prisma from '../db';
import { isAuth, procedure, router } from '../trpc';
import { CreateEventSchema, JoinEventSchema, UpdateEventSchema } from '@/shared/api';
export const eventRouter = router({
	findMany: procedure.query(async ({ ctx: { user } }) => {

		const events = await prisma.event.findMany({
			include: {
				partycipation: true
			}
		})

		return events.map(({ partycipation, ...event }) => ({
			...event,
			isJoined: partycipation.some(({ userId }) => userId === user?.id)
		}))
	}),
	findUnique: procedure
		.input(
			z.object({
				id: z.number(),
			}),
		)
		.use(isAuth)
		.query(({ input }) => {
			return prisma.event.findUnique({
				where: input,

				select: {
					title: true,
					description: true,
					date: true,
					partycipation: {
						select: {
							user: {
								select: {
									name: true,
								},
							},
						},
					},
				},
			});
		}),
	create: procedure.input(
		CreateEventSchema
	).use(isAuth).mutation(({ input, ctx: { user } }) => {
		return prisma.event.create({
			data: {
				authorId: user.id,
				...input
			}
		})
	}),
	join: procedure
		.input(JoinEventSchema)
		.use(isAuth)
		.mutation(({ input, ctx: { user } }) => {
			return prisma.partycipation.create({
				data: {
					eventId: input.id,
					userId: user.id,
				},
			});
		}),
	leave: procedure
		.input(JoinEventSchema)
		.use(isAuth)
		.mutation(({ input, ctx: { user } }) => {
			return prisma.partycipation.delete({
				where: {
					userId_eventId: {
						eventId: input.id,
						userId: user.id,
					},
				},
			});
		}),
	update: procedure
		.input(UpdateEventSchema)
		.use(isAuth)
		.mutation(({ input }) => {
			return prisma.event.update({
				data: {
					title: input.title,
					description: input.description,
					date: input.date,
				},
				where: {
					id: input.id,
				},
			});
		}),
})