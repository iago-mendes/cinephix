import {useEffect, useState} from 'react'
import Select from 'react-select'
import {useRouter} from 'next/router'
import Image from 'next/image'
import {FiCheck, FiMinus, FiPlus, FiX} from 'react-icons/fi'

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
	const {query, back} = useRouter()

	const [banner, setBanner] = useState('')
	const [nickname, setNickname] = useState('')
	const [urlId, setUrlId] = useState('')
	const [event, setEvent] = useState('')
	const [description, setDescription] = useState('')
	const [participantEmails, setParticipantEmails] = useState<string[]>([''])

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

	function handleAddParticipant()
	{
		let tmpParticipantEmails = [...participantEmails]
		tmpParticipantEmails.push('')
		setParticipantEmails(tmpParticipantEmails)
	}

	function handleRemoveParticipant(index: number)
	{
		let tmpParticipantEmails = [...participantEmails]
		tmpParticipantEmails.splice(index, 1)
		setParticipantEmails(tmpParticipantEmails)
	}

	function handleChangeParticipant(email: string, index: number)
	{
		let tmpParticipantEmails = [...participantEmails]
		tmpParticipantEmails[index] = email
		setParticipantEmails(tmpParticipantEmails)
	}

	function handleSubmit()
	{}

	return (
		<Container onSubmit={e => e.preventDefault()} >
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
					placeholder='E.g.: Avengers'
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
					placeholder='E.g.: avengers'
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
					placeholder="E.g.: Earth's mightiest heroes"
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
			{/* participantEmails */}
			<div className='field'>
				<label htmlFor='participantEmail'>Participants</label>
				<ul className='list' >
					{participantEmails.map((email, index) => (
						<li key={index} className='text' >
							<input
								type='email'
								name='participantEmail'
								id={`participantEmail-${index}`}
								value={email}
								onChange={e => handleChangeParticipant(e.target.value, index)}
							/>
							<button className='remove' onClick={() => handleRemoveParticipant(index)} >
								<FiMinus size={20} />
							</button>
						</li>
					))}
					<button className='add' onClick={handleAddParticipant} >
						<FiPlus size={25} />
					</button>
				</ul>
			</div>

			<div className='buttons'>
				<button className='cancel' title='Cancel' onClick={back} type='button' >
					<FiX size={25} />
				</button>
				<button className='confirm' title='Confirm' type='submit' onClick={handleSubmit} >
					<FiCheck size={25} />
				</button>
			</div>
		</Container>
	)
}

export default GroupForm