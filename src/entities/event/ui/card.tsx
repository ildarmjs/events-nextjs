import Link from 'next/link'
import { FC, ReactNode } from 'react'

interface ICardProps {
	id: number
	date: string
	title: string
	description: string | null
	action: ReactNode
}

const Card: FC<ICardProps> = ({ id, date, title, description, action }) => {
	return (
		<div className='flex font-sans'>
			<div className='flex-none w-48 relative'>
				<img
					src='https://images.unsplash.com/photo-1712903276864-79723b184ffa?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTZ8fGV2ZW50c3xlbnwwfHwwfHx8MA%3D%3D'
					alt=''
					className='object-cover'
					// className='absolute inset-0 w-full h-full object-cover'
					loading='lazy'
				/>
			</div>
			<form className='flex-auto p-6'>
				<div className='flex flex-wrap'>
					<h1 className='flex-auto text-lg font-semibold text-slate-900'>
						{title}
					</h1>

					<div className='w-full flex-none text-sm font-medium text-slate-700 mt-2'>
						{description}
					</div>
				</div>
				<div className='flex items-baseline mt-4 mb-6 pb-6 border-b border-slate-200'>
					<div className='space-x-2 flex text-sm'></div>
				</div>
				<div className='flex space-x-4 mb-6 text-sm font-medium'>
					<div className='flex-auto flex space-x-4'>
						{action}
						<Link
							href={`/events/${id}`}
							className='h-10 px-6 font-semibold rounded-md border border-slate-200 text-slate-900 align-middle leading-10'
						>
							Подробнее
						</Link>
					</div>
					<div>{date}</div>
				</div>
			</form>
		</div>
	)
}

export default Card
