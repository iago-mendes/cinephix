import Link from 'next/link'
import {BiUserCircle} from 'react-icons/bi'

import Container from '../styles/components/Menu'
import logo from '../assets/logo-name.svg'

const Menu: React.FC = () =>
{
	return (
		<Container>
			<img src={logo} alt='Cinephix' className='logo' />
			<div className='container'>
				<div className='links'>
					<Link href='/movies' >
						Movies
					</Link>
					<Link href='/tvshows' >
						TV shows
					</Link>
					<Link href='/celebrities' >
						Celebrities
					</Link>				
				</div>
				<div className='user'>
					<span>Sign in</span>
					<button>
						<BiUserCircle size={35} />
					</button>
				</div>
			</div>
		</Container>
	)
}

export default Menu