import { z } from "zod";
import { RouterOutput } from ".";

export const CreateEventSchema = z.object({
	title: z.string().min(1),
	description: z.string().optional(),
	date: z.coerce.date()
})
export const UpdateEventSchema = z.object({
	id: z.number().int().positive(),
	title: z.string().min(1),
	description: z.string().optional(),
	date: z.coerce.date(),
});

export const JoinEventSchema = z.object({
	id: z.number().int().positive(),
});

export type EventDetailProps = NonNullable<RouterOutput["event"]["findUnique"]>;