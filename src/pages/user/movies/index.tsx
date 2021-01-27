import Head from 'next/head'
import {useEffect, useState} from 'react'
import Image from 'next/image'
import {BsFillTriangleFill} from 'react-icons/bs'
import Select from 'react-select'
import {FiPlus} from 'react-icons/fi'

import Container, {Dropdown} from '../../../styles/pages/user/movies/index'
import api from '../../../services/api'
import useUser from '../../../hooks/useUser'
import getTotalRating from '../../../utils/getTotalRating'
import {defaultUserMovieListed, UserMovieListed} from '../../../models/userMovie'
import {selectStyles} from '../../../styles/global'
import SelectMovie from '../../../components/modals/SelectMovie'
import UserMovieModal from '../../../components/modals/UserMovie'

const UserMovies: React.FC = () =>
{
	const {user} = useUser()

	const [movieList, setMovieList] = useState<UserMovieListed[]>([])
	const [showWatchList, setShowWatchList] = useState(false)

	const sortOptions =
	[
		{label: 'Title', value: 'title'},
		{label: 'Release date', value: 'releaseDate'},
		{label: 'My ratings', value: 'ratings'}
	]
	const [sortOption, setSortOption] = useState(sortOptions[0])

	const [isSelectMovieOpen, setIsSelectMovieOpen] = useState(false)
	const [selectMovieWatchedProp, setSelectMovieWatchedProp] = useState(true)

	const [isUserMovieOpen, setIsUserMovieOpen] = useState(false)
	const [selectedUserMovie, setSelectedUserMovie] = useState<UserMovieListed>(defaultUserMovieListed)

	useEffect(() =>
	{
		getMovieList()
	}, [user])

	useEffect(() =>
	{
		handleSort()
	},[sortOption])

	async function getMovieList()
	{
		if (user)
		{
			const {data}:{data: UserMovieListed[]} = await api.get(`users/${user.email}/movies`)
			setMovieList(handleSort(data))
		}
	}

	function handleSort(data?: UserMovieListed[])
	{
		const tmpMovieList = data ? [...data] : [...movieList]

		if (sortOption.value === 'title')
			tmpMovieList.sort((a, b) => a.data.title < b.data.title ? -1 : 1)
		else if (sortOption.value === 'releaseDate')
			tmpMovieList.sort((a, b) => a.data.date > b.data.date ? -1 : 1)
		else if (sortOption.value === 'ratings')
			tmpMovieList.sort((a, b) => getTotalRating(a.ratings) < getTotalRating(b.ratings) ? -1 : 1)

		if (data)
			return tmpMovieList
		else
			setMovieList(tmpMovieList)
	}

	function handleAddClick(watched: boolean)
	{
		setSelectMovieWatchedProp(watched)
		setIsSelectMovieOpen(true)
	}

	function handleCardClick(movie: UserMovieListed)
	{
		setSelectedUserMovie(movie)
		setIsUserMovieOpen(true)
	}

	return (
		<Container>
			<Head>
				<title>User movies</title>
			</Head>

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

			<main>
				<div className='options'>
					<div className='sort'>
						<span>Sort by</span>
						<Select
							value={sortOption}
							options={sortOptions}
							onChange={setSortOption}
							styles={selectStyles}
							placeholder='property'
							className='select'
						/>
					</div>
				</div>

				<div className='watchList'>
					<Dropdown 
						showWatchList={showWatchList}
						onClick={() => setShowWatchList(!showWatchList)}
					>
						<BsFillTriangleFill size={25}/>
						<span>Watch list</span>
					</Dropdown>
					{
						showWatchList && (
							<div className='grid' >
								<button className='add' title='Add a movie' onClick={() => handleAddClick(false)} >
									<FiPlus size={30} />
								</button>
								{movieList.filter(({watched}) => !watched).map((movie) => (
									<div
										key={movie.data.id}
										className='movie'
										onClick={() => handleCardClick(movie)}
									>
										<div className='img'>
											<Image src={movie.data.image} width={780} height={1170} layout='responsive'/>
										</div>
										<div className='info'>
											<h2>{movie.data.title}</h2>
											<div className='details'>
												<span className='venue'>{movie.venue}</span>
											</div>
										</div>
									</div>
								))}
							</div>
						)
					}
				</div>

				<div className='watched'>
					<div className='grid' >
						<button className='add' title='Add a movie' onClick={() => handleAddClick(true)} >
							<FiPlus size={30} />
						</button>
						{movieList.filter(({watched}) => watched).map((movie) => (
							<div
								key={movie.data.id}
								className='movie'
								onClick={() => handleCardClick(movie)}
							>
								<div className='img'>
									<Image src={movie.data.image} width={780} height={1170} layout='responsive'/>
								</div>
								<div className='info'>
									<h2>{movie.data.title}</h2>
									<div className='details'>
										{
											Object.values(movie.ratings).length !== 0 && (
												<span className='ratings'>
													{getTotalRating(movie.ratings, true, 13)} ({getTotalRating(movie.ratings)})
												</span>
											)
										}
										<span className='venue'>{movie.venue}</span>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</main>
		</Container>
	)
}

export default UserMovies