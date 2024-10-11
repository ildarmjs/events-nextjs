import { SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'
import { CreateEventSchema } from '@/shared/api'
import { zodResolver } from '@hookform/resolvers/zod'
export type CreateEventValues = z.infer<typeof CreateEventSchema>

type CreateEventFormProps = {
	onSubmit: (data: CreateEventValues) => void
}

export default function CreateEventForm({ onSubmit }: CreateEventFormProps) {
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors }
	} = useForm<CreateEventValues>({
		resolver: zodResolver(CreateEventSchema)
	})
	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div className='space-y-12'>
				<div className='border-b border-gray-900/10 pb-12'>
					<h2 className='text-base font-semibold leading-7 text-gray-900'>
						Событие
					</h2>
					<p className='mt-1 text-sm leading-6 text-gray-600'>
						Заполните форму для создания события
					</p>

					<div className='mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6'>
						<div className='sm:col-span-4'>
							<label
								htmlFor='title'
								className='block text-sm font-medium leading-6 text-gray-900'
							>
								Название
							</label>
							<div className='mt-2'>
								<div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md'>
									<input
										id='title'
										type='text'
										placeholder='Название'
										autoComplete='title'
										className='block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6'
										{...register('title')}
									/>
								</div>
								<p className='mt-3 text-sm leading-6 text-gray-600'>
									{errors.title?.message}
								</p>
							</div>
						</div>

						<div className='col-span-full'>
							<label
								htmlFor='description'
								className='block text-sm font-medium leading-6 text-gray-900'
							>
								Описание
							</label>
							<div className='mt-2'>
								<textarea
									id='description'
									{...register('description')}
									rows={3}
									className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
									defaultValue={''}
								/>
							</div>
							<p className='mt-3 text-sm leading-6 text-gray-600'>
								Напишите несколько предложений о событии
							</p>
						</div>

						<div className='col-span-full'></div>
						<label
							htmlFor='date'
							className='block text-sm font-medium leading-6 text-gray-900'
						>
							Дата проведения
						</label>
						<div className='mt-2'>
							<input
								type='date'
								id='date'
								{...register('date')}
								className='block rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-400'
							/>
						</div>
					</div>
				</div>
				<div className='mt-6 flex items-center justify-end gap-x-6'>
					<button
						type='button'
						className='text-sm font-semibold leading-6 text-gray-900'
					>
						Отмена
					</button>
					<button
						type='submit'
						className='rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
					>
						Сохранить
					</button>
				</div>
			</div>
		</form>
	)
}
