import {useEffect, useState} from 'react'
import Select from 'react-select'
import {useRouter} from 'next/router'
import Image from 'next/image'

import Container from '../../styles/components/forms/Group'
import {GroupRaw} from '../../models/group'
import getBanner, {chooseRandomBanner} from '../../utils/getBanner'
import {SelectOption} from '../../models'
import {selectStyles} from '../../styles/global'
import api from '../../services/api'
import {EventListed} from '../../models/event'

interface GroupFormProps
{
	method: string
	group?: GroupRaw
}

const GroupForm: React.FC<GroupFormProps> = ({method}) =>
{
	const {query} = useRouter()

	const [banner, setBanner] = useState('')
	const [nickname, setNickname] = useState('')
	const [urlId, setUrlId] = useState('')
	const [event, setEvent] = useState('')
	const [description, setDescription] = useState('')
	const [participantEmails, setParticipantEmails] = useState<string[]>([])

	const [eventOptions, setEventOptions] = useState<SelectOption[]>([])

	useEffect(() =>
	{
		if (method === 'post')
		{
			const randomBanner = chooseRandomBanner()
			setBanner(randomBanner)
		}

		api.get('events').then(({data}:{data: EventListed[]}) =>
		{
			const tmpEventOptions: SelectOption[] = data.map(event => (
				{
					label: event.name,
					value: event.id
				}))
			
			setEventOptions(tmpEventOptions)
		})
	}, [])

	useEffect(() =>
	{
		const {event: routeEvent} = query
		if (routeEvent)
		{
			const tmpEvent = eventOptions.find(event => event.value === String(routeEvent))

			if (tmpEvent)
				setEvent(tmpEvent.value)
		}
	}, [query, eventOptions])

	return (
		<Container>
			<header>
				<div className='img' >
					<Image src={getBanner(banner)} width={1500} height={750} layout='responsive' />
				</div>
				<button title='Change banner' onClick={() => {}} >
					Change banner
				</button>
			</header>

			{/* nickname */}
			<div className='text field'>
				<label htmlFor='nickname'>Nickname</label>
				<input
					name='nickname'
					id='nickname'
					type='text'
					value={nickname}
					onChange={e => setNickname(e.target.value)}
				/>
			</div>
			{/* urlId */}
			<div className='text field'>
				<label htmlFor='urlId'>Group ID</label>
				<input
					name='urlId'
					id='urlId'
					type='text'
					value={urlId}
					onChange={e => setUrlId(e.target.value)}
				/>
			</div>
			{/* description */}
			<div className='text field'>
				<label htmlFor='description'>Description</label>
				<textarea
					name='description'
					id='description'
					value={description}
					onChange={e => setDescription(e.target.value)}
				/>
			</div>
			{/* event */}
			<div className='select field'>
				<label htmlFor='event'>Event</label>
				<Select
					id='event'
					name='event'
					value={eventOptions.find(({value}) => value === event)}
					options={eventOptions}
					onChange={e => setEvent(e.value)}
					styles={selectStyles}
					placeholder='Select a event'
					className='select'
					isSearchable={false}
				/>
			</div>
		</Container>
	)
}

export default GroupForm