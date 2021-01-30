import Link from 'next/link'
import Container from '../styles/components/Footer'
import Image from 'next/image'

import logoName from '../assets/logo/name.svg'
import logoIcon from '../assets/logo/icon.svg'

const Footer: React.FC = () =>
{
	return (
		<Container>
			<div className='logos'>
				<div className='icon'>
					<Image src={logoIcon} width={1000} height={1000} layout='responsive' />
				</div>
				<div className='name'>
					<Image src={logoName} width={1000} height={200} layout='responsive' />
				</div>
			</div>
			<div className='info'>
				<div className='links'>
					<Link href='/' >Home</Link>
					<Link href='/movies' >Movies</Link>
					<Link href='/tvshows' >TV shows</Link>
					<Link href='/celebrities' >Celebrities</Link>
					<Link href='/about' >About</Link>
				</div>
				<div className='attribution'>
					<Link href='/about/data'>Media data</Link> from <a target='_blank' rel='noreferrer' href='https://www.themoviedb.org/'>TMDb</a>.
				</div>
			</div>
		</Container>
	)
}

export default Footer