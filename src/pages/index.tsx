import Image from 'next/image'
import { Inter } from 'next/font/google'
import prisma from '@/server/db'
import { trpc } from '@/shared/api/index'
import Card from '@/entities/event/ui/card'
import { JoinEventButton } from '@/features/join-event'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
	const { data, refetch } = trpc.event.findMany.useQuery()

	return (
		<div className='max-w-[1000px] mx-auto'>
			<ul>
				{data?.map(event => (
					<li key={event.id}>
						<Card
							{...event}
							action={
								!event.isJoined && (
									<JoinEventButton eventId={event.id} onSuccess={refetch} />
								)
							}
						/>
					</li>
				))}
			</ul>
		</div>
	)
}
