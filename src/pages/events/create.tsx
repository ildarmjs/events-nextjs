import CreateEventForm, {
	CreateEventValues
} from '@/features/create-event/ui/form'
import { trpc } from '@/shared/api/index'
import { useRouter } from 'next/router'

export default function CreateEvent() {
	const router = useRouter()
	const { mutate } = trpc.event.create.useMutation({
		onSuccess: data => router.push(`/events/${data.id}`)
	})
	const cancelHandler = () => {
		router.push(`/`)
	}
	const createEventForm = (data: CreateEventValues) => {
		mutate(data)
	}
	return (
		<div className='max-w-[1000px] mx-auto'>
			<CreateEventForm
				onSubmit={createEventForm}
				cancelHandler={cancelHandler}
			/>
		</div>
	)
}
