import {useState} from 'react'
import {BiSort} from 'react-icons/bi'
import useClickOutside from '../../hooks/useClickOutside'

import Container from '../../styles/components/modals/Sort'

const SortModal: React.FC = () =>
{
	const [showOptions, setShowOptions] = useState(false)
	const ref = useClickOutside(() => setShowOptions(false))

	return (
		<Container ref={ref} >
			<button
				title='Sort TV shows'
			>
				<BiSort size={20} />
			</button>
		</Container>
	)
}

export default SortModal