import {FaSearch} from 'react-icons/fa'

import Container from '../styles/components/SearchBox'
import { useUserStatus } from '../contexts/UserStatus'

interface SearchBoxProps
{
	search: string
	setSearch: (p: string) => void

	display: string
}

const SearchBox: React.FC<SearchBoxProps> = ({search, setSearch, display}) =>
{
	const {typingControllerProps} = useUserStatus()

	return (
		<Container>
			<FaSearch size={25} />
			<input
				type='text'
				placeholder={display}
				value={search}
				onChange={e => setSearch(e.target.value)}
				maxLength={100}
				{...typingControllerProps}
			/>
		</Container>
	)
}

export default SearchBox