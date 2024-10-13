import Image from 'next/image'
import { Inter } from 'next/font/google'
import prisma from '@/server/db'
import { trpc } from '@/shared/api/index'
import Card from '@/entities/event/ui/card'
import { JoinEventButton } from '@/features/join-event'
import { LeaveEventButtonProps } from '@/features/leave-event'
import Link from 'next/link'
import { useSession } from 'next-auth/react'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
	const { data, refetch } = trpc.event.findMany.useQuery()
	console.log('data:', data)
	const { status } = useSession()
	return (
		<div className='max-w-[1000px] mx-auto'>
			<div className='flex justify-end mb-3'>
				{status === 'unauthenticated' ? (
					<Link
						className='h-10 px-6 font-semibold rounded-md bg-green-600 text-white align-middle leading-10'
						href='/api/auth/signin'
					>
						Войти
					</Link>
				) : (
					<>
						<Link
							className='h-10 px-6 font-semibold rounded-md bg-green-500 text-white align-middle leading-10 mr-3'
							href='/events/create'
						>
							Создать событие
						</Link>
						<Link
							className='h-10 px-6 font-semibold rounded-md bg-red-600 text-white align-middle leading-10'
							href='/api/auth/signout'
						>
							Выйти
						</Link>
					</>
				)}
			</div>
			<ul>
				{data?.map(event => (
					<li key={event.id}>
						<Card
							{...event}
							action={
								!event.isJoined ? (
									<JoinEventButton eventId={event.id} onSuccess={refetch} />
								) : (
									<LeaveEventButtonProps
										eventId={event.id}
										onSuccess={refetch}
									/>
								)
							}
						/>
					</li>
				))}
			</ul>
		</div>
	)
}
