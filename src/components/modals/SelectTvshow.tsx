import {useState} from 'react'
import {FaSearch} from 'react-icons/fa'
import {FiX} from 'react-icons/fi'
import Modal from 'react-modal'

import Container from '../../styles/components/modals/SelectTvshow'
import {modalStyle} from '../../styles/global'

Modal.setAppElement('#__next')

interface SelectTvshowProps
{
	isOpen: boolean
	setIsOpen: Function
}

const SelectTvshow: React.FC<SelectTvshowProps> = ({isOpen, setIsOpen}) =>
{
	const [search, setSearch] = useState('')

	return (
		<Modal
			isOpen={isOpen}
			style={modalStyle}
		>
			<Container>
				<header>
					<button onClick={() => setIsOpen(false)} >
						<FiX size={25} />
					</button>
				</header>
				<div className='search'>
					<FaSearch size={25} />
					<input
						type='text'
						placeholder='Search for a TV show'
						value={search}
						onChange={e => setSearch(e.target.value)}
					/>
				</div>				
			</Container>
		</Modal>
	)
}

export default SelectTvshow