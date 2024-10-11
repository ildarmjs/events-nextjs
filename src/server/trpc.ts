import { initTRPC, TRPCError } from '@trpc/server';
import { Context } from './context';
import superjson from 'superjson';

const t = initTRPC.context<Context>().create({
	// transformer: superjson
});

export const router = t.router;
export const procedure = t.procedure;


export const isAuth = t.middleware(async (opts) => {
	const { ctx } = opts;
	if (!ctx.user) {
		throw new TRPCError({ code: 'UNAUTHORIZED' });
	}
	return opts.next({
		ctx: {
			user: ctx.user,
		},
	});
});