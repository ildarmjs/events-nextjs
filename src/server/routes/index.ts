import { z } from 'zod';
import { procedure, router } from '../trpc';
import { eventRouter } from './events';
export const appRouter = router({
	event: eventRouter
});

export type AppRouter = typeof appRouter;