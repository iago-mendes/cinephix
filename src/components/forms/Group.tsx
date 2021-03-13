import {useEffect, useState} from 'react'

import Container from '../../styles/components/forms/Group'
import {GroupRaw} from '../../models/group'
import getBanner, { chooseRandomBanner } from '../../utils/getBanner'
import Image from 'next/image'

interface GroupFormProps
{
	method: string
	group?: GroupRaw
}

const GroupForm: React.FC<GroupFormProps> = ({method}) =>
{
	const [nickname, setNickname] = useState('')
	const [urlId, setUrlId] = useState('')
	const [banner, setBanner] = useState('')
	const [event, setEvent] = useState('')
	const [description, setDescription] = useState('')
	const [participantEmails, setParticipantEmails] = useState<string[]>([])

	useEffect(() =>
	{
		if (method === 'post')
		{
			const randomBanner = chooseRandomBanner()
			setBanner(randomBanner)
		}
	}, [])

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
		</Container>
	)
}

export default GroupForm