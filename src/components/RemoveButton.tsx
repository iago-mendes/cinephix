import {useRouter} from 'next/router'
import {FiTrash} from 'react-icons/fi'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

import Container from '../styles/components/RemoveButton'
import confirmAlert from '../utils/alerts/confirm'
import errorAlert from '../utils/alerts/error'
import api from '../services/api'

const MySwal = withReactContent(Swal)

interface RemoveButtonProps
{
	title: string
	collection: string

	apiRoute: string
}

const RemoveButton: React.FC<RemoveButtonProps> = ({title, collection, apiRoute}) =>
{
	const {back} = useRouter()

	function handleClick()
	{
		MySwal.fire(
		{
			icon: 'question',
			title: 'Are you sure?',
			text: `If you continue, '${title}' will be removed from your ${collection}!`,
			showCancelButton: true,
			confirmButtonText: 'Continue'
		})
		.then(res =>
		{
			if (res.isConfirmed)
				handleRemove()
		})
	}

	function handleRemove()
	{
		api.delete(apiRoute)
			.then(() =>
			{
				confirmAlert(`'${title}' was successfully removed from your ${collection}!`)
				back()
			})
			.catch(err =>
			{
				errorAlert(err.response.data.message)
			})
	}

	return (
		<Container onClick={handleClick} >
			<FiTrash size={30} />
		</Container>
	)
}

export default RemoveButton