import Link from 'next/link'
import Container from '../styles/components/Footer'

const Footer: React.FC = () =>
{
	return (
		<Container>
			<div className='links'>
				<Link href='/' >Home</Link>
				<Link href='/movies' >Movies</Link>
				<Link href='/tvshows' >TV shows</Link>
				<Link href='/celebrities' >Celebrities</Link>
				<Link href='/about' >About</Link>
			</div>
			<div className='attribution'>
				<Link href='/about/data'>Media data</Link> from <a href='https://www.themoviedb.org/'>TMDb</a>.
			</div>
		</Container>
	)
}

export default Footer