import {useEffect, useState} from 'react'
import Select from 'react-select'
import {useRouter} from 'next/router'
import Image from 'next/image'
import {FiCheck, FiMinus, FiPlus, FiX} from 'react-icons/fi'

import Container from './styles'
import {banners} from '../../../assets/db/banners'
import {GroupRaw} from '../../../models/group'
import getBanner, {chooseRandomBanner} from '../../../utils/getBanner'
import {SelectOption} from '../../../models'
import {selectStyles} from '../../../styles/global'
import api from '../../../services/api'
import {EventListed} from '../../../models/event'
import successAlert from '../../../utils/alerts/success'
import errorAlert from '../../../utils/alerts/error'
import {useAuth} from '../../../hooks/useAuth'
import SelectBannerModal from '../../_modals/SelectBanner'
import slugify from '../../../utils/slugify'
import {useUserStatus} from '../../../hooks/useUserStatus'

interface GroupFormProps {
	method: string
	group?: GroupRaw
}

const GroupForm: React.FC<GroupFormProps> = ({method, group}) => {
	const {user} = useAuth()
	const {query, back, push} = useRouter()
	const {typingControllerProps} = useUserStatus()

	const [banner, setBanner] = useState(banners[0].path)
	const [nickname, setNickname] = useState('')
	const [urlId, setUrlId] = useState('')
	const [event, setEvent] = useState('')
	const [description, setDescription] = useState('')
	const [participantEmails, setParticipantEmails] = useState<string[]>([''])

	const [eventOptions, setEventOptions] = useState<SelectOption[]>([])

	const [isSelectBannerOpen, setIsSelectBannerOpen] = useState(false)

	useEffect(() => {
		if (method === 'post') {
			const randomBanner = chooseRandomBanner()
			setBanner(randomBanner)
		}

		api.get('events').then(({data}: {data: EventListed[]}) => {
			const tmpEventOptions: SelectOption[] = data.map(event => ({
				label: event.name,
				value: event.id
			}))

			setEventOptions(tmpEventOptions)
		})
	}, [])

	useEffect(() => {
		const {event: routeEvent} = query
		if (routeEvent) {
			const tmpEvent = eventOptions.find(
				event => event.value === String(routeEvent)
			)

			if (tmpEvent) setEvent(tmpEvent.value)
		}
	}, [query, eventOptions])

	useEffect(() => {
		if (method === 'put') {
			setBanner(group.banner)
			setNickname(group.nickname)
			setUrlId(group.urlId)
			setEvent(group.event)
			setDescription(group.description)

			const tmpParticipantEmails = group.participants
				.map(participant => participant.email)
				.filter(email => email != user.email)
			setParticipantEmails(tmpParticipantEmails)
		}
	}, [group])

	useEffect(() => {
		if (method === 'post') {
			const tmpUrlId = slugify(nickname)
			setUrlId(tmpUrlId)
		}
	}, [nickname])

	function handleAddParticipant() {
		const tmpParticipantEmails = [...participantEmails]
		tmpParticipantEmails.push('')
		setParticipantEmails(tmpParticipantEmails)
	}

	function handleRemoveParticipant(index: number) {
		const tmpParticipantEmails = [...participantEmails]
		tmpParticipantEmails.splice(index, 1)
		setParticipantEmails(tmpParticipantEmails)
	}

	function handleChangeParticipant(email: string, index: number) {
		const tmpParticipantEmails = [...participantEmails]
		tmpParticipantEmails[index] = email
		setParticipantEmails(tmpParticipantEmails)
	}

	function handleSubmit() {
		const participants = [
			{
				email: user.email,
				isOwner: true,
				predictions: []
			},
			...participantEmails
				.filter(email => email !== '')
				.map(email => ({
					email,
					isOwner: false,
					predictions: []
				}))
		]

		console.log('[participants]', participants)

		const data = {
			nickname,
			urlId,
			banner,
			event,
			description,
			participants
		}

		if (method === 'post') {
			api
				.post('groups', data)
				.then(() => {
					successAlert(`'${nickname}' was successfully created!`)
					push(`/groups/${urlId}`)
				})
				.catch(err => {
					errorAlert(err.response.data.message)
				})
		} else if (method === 'put') {
			api
				.put(`groups/${group.urlId}`, data)
				.then(() => {
					successAlert(`'${nickname}' was successfully edited!`)
					push(`/groups/${group.urlId}`)
				})
				.catch(err => {
					errorAlert(err.response.data.message)
				})
		}
	}

	return (
		<Container onSubmit={e => e.preventDefault()}>
			<SelectBannerModal
				isOpen={isSelectBannerOpen}
				setIsOpen={setIsSelectBannerOpen}
				banner={banner}
				setBanner={setBanner}
			/>

			<header>
				<div className="img">
					<Image
						src={getBanner(banner)}
						width={1500}
						height={750}
						layout="responsive"
					/>
				</div>
				<button
					title="Change banner"
					onClick={() => setIsSelectBannerOpen(true)}
				>
					Change banner
				</button>
			</header>

			{/* nickname */}
			<div className="text field">
				<label htmlFor="nickname">Nickname</label>
				<input
					name="nickname"
					id="nickname"
					type="text"
					value={nickname}
					onChange={e => setNickname(e.target.value)}
					placeholder="E.g.: Avengers"
					{...typingControllerProps}
				/>
			</div>
			{/* urlId */}
			<div className="text field">
				<label htmlFor="urlId">Group ID</label>
				<input
					name="urlId"
					id="urlId"
					type="text"
					value={urlId}
					onChange={e => setUrlId(e.target.value)}
					placeholder="E.g.: avengers"
					disabled={method === 'put'}
					{...typingControllerProps}
				/>
			</div>
			{/* description */}
			<div className="text field">
				<label htmlFor="description">Description</label>
				<textarea
					name="description"
					id="description"
					value={description}
					onChange={e => setDescription(e.target.value)}
					placeholder="E.g.: Earth's mightiest heroes"
					{...typingControllerProps}
				/>
			</div>
			{/* event */}
			<div className="select field">
				<label htmlFor="event">Event</label>
				<Select
					id="event"
					name="event"
					value={eventOptions.find(({value}) => value === event)}
					options={eventOptions}
					onChange={e => setEvent(e.value)}
					styles={selectStyles}
					placeholder="Select a event"
					className="select"
					isSearchable={false}
				/>
			</div>
			{/* participantEmails */}
			<div className="field">
				<label htmlFor="participantEmail">Participants</label>
				<ul className="list">
					<li className="text">
						<input
							type="email"
							name="participantEmail"
							id={'participantEmail-owner'}
							value={user ? user.email : ''}
							readOnly
						/>
					</li>
					{participantEmails.map((email, index) => (
						<li key={index} className="text">
							<input
								type="email"
								name="participantEmail"
								id={`participantEmail-${index}`}
								value={email}
								onChange={e => handleChangeParticipant(e.target.value, index)}
								{...typingControllerProps}
							/>
							<button
								className="remove"
								onClick={() => handleRemoveParticipant(index)}
							>
								<FiMinus size={20} />
							</button>
						</li>
					))}
					<button className="add" onClick={handleAddParticipant}>
						<FiPlus size={25} />
					</button>
				</ul>
			</div>

			<div className="buttons">
				<button className="cancel" title="Cancel" onClick={back} type="button">
					<FiX size={25} />
				</button>
				<button
					className="confirm"
					title="Confirm"
					type="submit"
					onClick={handleSubmit}
				>
					<FiCheck size={25} />
				</button>
			</div>
		</Container>
	)
}

export default GroupForm
