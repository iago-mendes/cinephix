import {useEffect, useState} from 'react'
import Image from 'next/image'
import {BsFillTriangleFill} from 'react-icons/bs'
import Select from 'react-select'
import {FiPlus} from 'react-icons/fi'
import {motion} from 'framer-motion'
import {useRouter} from 'next/router'

import Container, {Dropdown} from '../../../styles/pages/user/movies/index'
import api from '../../../services/api'
import useUser from '../../../hooks/useUser'
import getTotalRating from '../../../utils/getTotalRating'
import {
	defaultUserMovieListed,
	loadingUserMovieListed,
	UserMovieListed
} from '../../../models/userMovie'
import {selectStyles} from '../../../styles/global'
import SelectMovie from '../../../components/modals/SelectMovie'
import UserMovieModal from '../../../components/modals/UserMovie'
import SEOHead from '../../../components/SEOHead'
import truncateText from '../../../utils/truncateText'
import HorizontalAd from '../../../components/ads/Horizontal'
import {SkeletonLoading} from '../../../utils/skeletonLoading'

const UserMovies: React.FC = () => {
	const {user} = useUser()
	const {locale: language} = useRouter()

	const defaultMovieList: UserMovieListed[] = Array(7).fill(
		loadingUserMovieListed
	)
	const [movieList, setMovieList] =
		useState<UserMovieListed[]>(defaultMovieList)
	const [showWatchList, setShowWatchList] = useState(false)

	const sortOptions = [
		{label: 'Release date', value: 'releaseDate'},
		{label: 'Title', value: 'title'},
		{label: 'My ratings', value: 'ratings'}
	]
	const [sortOption, setSortOption] = useState(sortOptions[0])

	const [isSelectMovieOpen, setIsSelectMovieOpen] = useState(false)
	const [selectMovieWatchedProp, setSelectMovieWatchedProp] = useState(true)

	const [isUserMovieOpen, setIsUserMovieOpen] = useState(false)
	const [selectedUserMovie, setSelectedUserMovie] = useState<UserMovieListed>(
		defaultUserMovieListed
	)

	useEffect(() => {
		getMovieList()
	}, [user])

	useEffect(() => {
		handleSort()
	}, [sortOption])

	async function getMovieList() {
		if (user) {
			const {data}: {data: UserMovieListed[]} = await api.get(
				`users/${user.email}/movies`,
				{params: {language}}
			)
			setMovieList(handleSort(data))
		}
	}

	function handleSort(data?: UserMovieListed[]) {
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
	}

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
			<SEOHead title="My movies | Cinephix" />

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
						<span>Sort by</span>
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
						<span>Watch list</span>
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
							title="Add a movie"
							onClick={() => handleAddClick(false)}
						>
							<FiPlus size={30} />
						</button>
						{movieList
							.filter(({watched}) => !watched)
							.map(movie => (
								<div
									key={movie.data.id}
									className="movie"
									onClick={() => handleCardClick(movie)}
								>
									<div className="img">
										<Image
											src={movie.data.image}
											width={780}
											height={1170}
											layout="responsive"
										/>
									</div>
									<div className="info">
										<h2>{truncateText(movie.data.title, 30)}</h2>
										<div className="details">
											<span className="venue">{movie.venue}</span>
										</div>
									</div>
								</div>
							))}
					</motion.div>
				</div>

				<div className="watched">
					<div className="grid">
						<button
							className="add"
							title="Add a movie"
							onClick={() => handleAddClick(true)}
						>
							<FiPlus size={30} />
						</button>
						{movieList
							.filter(({watched}) => watched)
							.map((movie, index) => {
								if (movie.data.id < 0)
									return (
										<div key={index} className="movie">
											<div className="img">
												<SkeletonLoading opacity={0.75} />
											</div>
											<div className="info">
												<h2>
													<SkeletonLoading height="3rem" opacity={0.75} />
												</h2>
												<div className="details">
													<span className="venue">
														<SkeletonLoading
															height="1.5rem"
															width="50%"
															opacity={0.75}
														/>
													</span>
												</div>
											</div>
										</div>
									)
								else
									return (
										<div
											key={index}
											className="movie"
											onClick={() => handleCardClick(movie)}
										>
											<div className="img">
												<Image
													src={movie.data.image}
													width={780}
													height={1170}
													layout="responsive"
												/>
											</div>
											<div className="info">
												<h2>{truncateText(movie.data.title, 30)}</h2>
												<div className="details">
													{Object.values(movie.ratings).length !== 0 && (
														<div className="ratings">
															{getTotalRating(movie.ratings, true)}
														</div>
													)}
													<span className="venue">{movie.venue}</span>
												</div>
											</div>
										</div>
									)
							})}
					</div>
				</div>
			</main>
		</Container>
	)
}

export default UserMovies
