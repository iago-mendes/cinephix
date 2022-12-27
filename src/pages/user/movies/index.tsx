import {useCallback, useEffect, useState} from 'react'
import {BsFillTriangleFill} from 'react-icons/bs'
import Select from 'react-select'
import {FiPlus} from 'react-icons/fi'
import {motion} from 'framer-motion'
import {useRouter} from 'next/router'
import {Trans, t} from '@lingui/macro'

import Container, {Dropdown} from '../../../styles/pages/user/movies/index'
import api from '../../../services/api'
import {useAuth} from '../../../hooks/useAuth'
import getTotalRating from '../../../utils/getTotalRating'
import {
	defaultUserMovieListed,
	loadingUserMovieListed,
	UserMovieListed
} from '../../../models/userMovie'
import {selectStyles} from '../../../styles/global'
import SelectMovie from '../../../components/_modals/_select/SelectMovie'
import UserMovieModal from '../../../components/_modals/UserMovie'
import SEOHead from '../../../components/SEOHead'
import HorizontalAd from '../../../components/_ads/Horizontal'
import {UserMediaCard} from '../../../components/_cards/UserMedia'

const UserMovies: React.FC = () => {
	const {user} = useAuth()
	const {locale: language} = useRouter()

	const defaultMovieList: UserMovieListed[] = Array(7).fill(
		loadingUserMovieListed
	)
	const [movieList, setMovieList] =
		useState<UserMovieListed[]>(defaultMovieList)
	const [showWatchList, setShowWatchList] = useState(false)

	const sortOptions = [
		{label: t`Release date`, value: 'releaseDate'},
		{label: t`Title`, value: 'title'},
		{label: t`My ratings`, value: 'ratings'}
	]
	const [sortOption, setSortOption] = useState(sortOptions[0])

	const [isSelectMovieOpen, setIsSelectMovieOpen] = useState(false)
	const [selectMovieWatchedProp, setSelectMovieWatchedProp] = useState(true)

	const [isUserMovieOpen, setIsUserMovieOpen] = useState(false)
	const [selectedUserMovie, setSelectedUserMovie] = useState<UserMovieListed>(
		defaultUserMovieListed
	)

	const handleSort = useCallback(
		(data?: UserMovieListed[]) => {
			const tmpMovieList = data ? [...data] : [...movieList]

			if (sortOption.value === 'title')
				tmpMovieList.sort((a, b) => (a.data.title < b.data.title ? -1 : 1))
			else if (sortOption.value === 'releaseDate')
				tmpMovieList.sort((a, b) => (a.data.date > b.data.date ? -1 : 1))
			else if (sortOption.value === 'ratings')
				tmpMovieList.sort((a, b) =>
					getTotalRating(a.ratings) < getTotalRating(b.ratings) ? -1 : 1
				)

			if (data) return tmpMovieList
			else setMovieList(tmpMovieList)
		},
		[movieList, sortOption.value]
	)

	const getMovieList = useCallback(async () => {
		if (user) {
			const {data}: {data: UserMovieListed[]} = await api.get(
				`users/${user.email}/movies`,
				{params: {language}}
			)
			setMovieList(handleSort(data))
		}
	}, [handleSort, language, user])

	useEffect(() => {
		getMovieList()
	}, [getMovieList, user])

	useEffect(() => {
		handleSort()
	}, [handleSort, sortOption])

	function handleAddClick(watched: boolean) {
		setSelectMovieWatchedProp(watched)
		setIsSelectMovieOpen(true)
	}

	function handleCardClick(movie: UserMovieListed) {
		setSelectedUserMovie(movie)
		setIsUserMovieOpen(true)
	}

	return (
		<Container className="page">
			<SEOHead title={t`My movies` + ' | Cinephix'} />

			<SelectMovie
				isOpen={isSelectMovieOpen}
				setIsOpen={setIsSelectMovieOpen}
				watched={selectMovieWatchedProp}
			/>

			<UserMovieModal
				isOpen={isUserMovieOpen}
				setIsOpen={setIsUserMovieOpen}
				movie={selectedUserMovie}
				revalidate={getMovieList}
			/>

			<HorizontalAd />

			<main>
				<div className="options">
					<div className="sort">
						<span>
							<Trans>Sort by</Trans>
						</span>
						<Select
							value={sortOption}
							options={sortOptions}
							onChange={setSortOption}
							styles={selectStyles}
							placeholder="property"
							className="select"
							isSearchable={false}
						/>
					</div>
				</div>

				<div className="watchList">
					<Dropdown
						showWatchList={showWatchList}
						onClick={() => setShowWatchList(!showWatchList)}
					>
						<BsFillTriangleFill size={25} />
						<span>
							<Trans>Watch list</Trans>
						</span>
					</Dropdown>
					<motion.div
						className="grid"
						initial={false}
						transition={{duration: 0.25}}
						animate={showWatchList ? 'open' : 'closed'}
						variants={{
							open: {
								height: 'fit-content',
								opacity: 1
							},
							closed: {
								height: 0,
								opacity: 0
							}
						}}
						style={{
							overflow: 'hidden'
						}}
					>
						<button
							className="add"
							title={t`Add a movie`}
							onClick={() => handleAddClick(false)}
						>
							<FiPlus size={30} />
						</button>
						{movieList
							.filter(({watched}) => !watched)
							.map(movie => (
								<UserMediaCard
									media={movie}
									key={movie.data.id}
									onClick={() => handleCardClick(movie)}
								/>
							))}
					</motion.div>
				</div>

				<div className="watched">
					<div className="grid">
						<button
							className="add"
							title={t`Add a movie`}
							onClick={() => handleAddClick(true)}
						>
							<FiPlus size={30} />
						</button>
						{movieList
							.filter(({watched}) => watched)
							.map((movie, index) => (
								<UserMediaCard
									media={movie}
									key={movie.data.id < 0 ? index : movie.data.id}
									onClick={() => handleCardClick(movie)}
								/>
							))}
					</div>
				</div>
			</main>
		</Container>
	)
}

export default UserMovies
