import '@/styles/globals.css'
import type { AppContext, AppProps } from 'next/app'
import { trpc } from '@/shared/api/index'
import { getSession, SessionProvider } from 'next-auth/react'

function App({ Component, pageProps }: AppProps) {
	return (
		<SessionProvider session={pageProps.session}>
			<Component {...pageProps} />
		</SessionProvider>
	)
}
App.getInitialProps = async (ctx: AppContext) => {
	return {
		pageProps: {
			session: await getSession(ctx.ctx)
		}
	}
}
export default trpc.withTRPC(App)
