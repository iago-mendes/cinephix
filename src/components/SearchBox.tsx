import {FaSearch} from 'react-icons/fa'

import Container from '../styles/components/SearchBox'

interface SearchBoxProps
{
	search: string
	setSearch: Function

	display: string
}

const SearchBox: React.FC<SearchBoxProps> = ({search, setSearch, display}) =>
{
	return (
		<Container>
			<FaSearch size={25} />
			<input
				type="text"
				placeholder={display}
				value={search}
				onChange={e => setSearch(e.target.value)}
			/>
		</Container>
	)
}

export default SearchBox