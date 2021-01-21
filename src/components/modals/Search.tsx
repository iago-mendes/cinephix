import { FiX } from 'react-icons/fi'
import Modal from 'react-modal'

import Container from '../../styles/components/modals/Search'
import {modalStyle} from '../../styles/global'

Modal.setAppElement('#__next')

interface SearchProps
{
	isOpen: boolean
	setIsOpen: Function

	category: string
}

const Search: React.FC<SearchProps> = ({isOpen, setIsOpen}) =>
{
	return (
		<Modal
			isOpen={isOpen}
			style={modalStyle}
		>
			<Container>
				<button className='close' onClick={() => setIsOpen(false)} >
					<FiX size={25} />
				</button>
			</Container>
		</Modal>
	)
}

export default Search