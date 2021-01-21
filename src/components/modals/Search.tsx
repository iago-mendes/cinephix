import {useState} from 'react'
import {FaSearch} from 'react-icons/fa'
import {FiX} from 'react-icons/fi'
import Modal from 'react-modal'

import Container from '../../styles/components/modals/Search'
import {modalStyle} from '../../styles/global'

Modal.setAppElement('#__next')

interface SearchProps
{
	isOpen: boolean
	setIsOpen: Function

	category: string
	display: string
}

const Search: React.FC<SearchProps> = ({isOpen, setIsOpen, category, display}) =>
{
	const [search, setSearch] = useState('')

	return (
		<Modal
			isOpen={isOpen}
			style={modalStyle}
		>
			<Container>
				<header>
					<div className='search'>
						<FaSearch size={25} />
						<input
							type='text'
							placeholder={display}
							value={search}
							onChange={e => setSearch(e.target.value)}
						/>
					</div>
					<button onClick={() => setIsOpen(false)} >
						<FiX size={25} />
					</button>
				</header>
				
			</Container>
		</Modal>
	)
}

export default Search