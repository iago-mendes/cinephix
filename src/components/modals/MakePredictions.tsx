import Select from 'react-select'
import {useEffect, useState} from 'react'
import {FiCheck, FiX} from 'react-icons/fi'

import Container from '../../styles/components/modals/MakePredictions'
import ModalContainer from './Container'
import useUser from '../../hooks/useUser'
import {selectStyles} from '../../styles/global'
import {SelectOption} from '../../models'
import Group, {GroupRawPrediction} from '../../models/group'
import api from '../../services/api'
import successAlert from '../../utils/alerts/success'
import errorAlert from '../../utils/alerts/error'

interface MakePredictionsModalProps
{
	isOpen: boolean
	setIsOpen: (p: boolean) => void

	group: Group
}

const MakePredictionsModal: React.FC<MakePredictionsModalProps> = ({isOpen, setIsOpen, group}) =>
{
	const {user} = useUser()
	
	const [predictions, setPredictions] = useState<GroupRawPrediction[]>([])

	const event = group.event

	useEffect(() =>
	{
		if (user && predictions.length === 0)
			api.get(`groups/${group.urlId}/participants/${user.email}/raw`)
				.then(({data}:{data: {predictions: GroupRawPrediction[]}}) =>
				{
					setPredictions(data.predictions)
				})
	}, [user])

	function handleSelectPrediction(category: string, guess: number)
	{
		let tmpPredictions = [...predictions]

		const existingIndex = tmpPredictions.findIndex(prediction => prediction.category === category)
		if (existingIndex < 0)
			tmpPredictions.push({category, guess})
		else
			tmpPredictions[existingIndex].guess = guess
		
		setPredictions(tmpPredictions)
	}

	function handleSubmit()
	{
		const data =
		{
			predictions
		}

		api.put(`groups/${group.urlId}/participants/${user.email}`, data)
			.then(() =>
			{
				successAlert('Your predictions were successfully saved!')
				setIsOpen(false)
			})
			.catch(err =>
			{
				errorAlert(err.response.data.message)
			})
	}

	return (
		<ModalContainer
			isOpen={isOpen}
			setIsOpen={setIsOpen}
		>
			<Container>
				<h1>
					My predictions for the {event.name}
				</h1>

				{event.categories.map((category, index) =>
				{
					const options: SelectOption[] = category.type === 'celebrities'
						? category.celebrities.map(eventCelebrity => (
							{
								label: `${eventCelebrity.celebrity.name} (${eventCelebrity.media.title})`,
								value: String(eventCelebrity.celebrity.id)
							}))
						: category.media.map(media => (
							{
								label: media.title,
								value: String(media.id)
							}))
					
					const selectName = category.type === 'celebrities'
						? 'celebrity'
						: category.media[0].type
					
					const prediction = predictions.find(prediction => prediction.category === category.id)

					return (
						<div className='category' key={index} >
							<label htmlFor='prediction' >
								{category.name}
							</label>
							<Select
								name='prediction'
								value={prediction && options.find(({value}) => Number(value) === prediction.guess)}
								options={options}
								onChange={e => handleSelectPrediction(category.id, Number(e.value))}
								styles={selectStyles}
								placeholder={`Select a ${selectName}`}
								className='select'
								isSearchable={false}
							/>
						</div>
					)
				})}

				<div className='buttons'>
					<button className='cancel' title='Cancel' onClick={() => setIsOpen(false)} >
						<FiX size={25} />
					</button>
					<button className='confirm' title='Confirm' onClick={handleSubmit} >
						<FiCheck size={25} />
					</button>
				</div>
			</Container>
		</ModalContainer>
	)
}

export default MakePredictionsModal