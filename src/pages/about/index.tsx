import Image from 'next/image'

import Container from '../../styles/pages/about/index'
import SEOHead from '../../components/SEOHead'
import logoName from '../../assets/logo/name.svg'
import logoIcon from '../../assets/logo/icon.svg'
import Link from 'next/link'

const About: React.FC = () =>
{
	return (
		<Container className='page' >
			<SEOHead
				title='About | Cinephix'
			/>

			<header>
				<div className='icon'>
					<Image src={logoIcon} width={1000} height={1000} layout='responsive' />
				</div>
				<div className='name'>
					<Image src={logoName} width={1000} height={200} layout='responsive' />
				</div>
			</header>

			<main>
				<div className='question'>
					<h1>What is Cinephix?</h1>
					<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam metus nibh, pulvinar ut urna ut, sollicitudin fermentum quam. Etiam consectetur commodo dolor et dapibus. Vestibulum nunc magna, sollicitudin vitae scelerisque sit amet, vulputate eget lectus. Cras ut tortor quis purus congue pretium.</p>
				</div>
				<div className='question'>
					<h1>Do I need to create an account?</h1>
					<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam metus nibh, pulvinar ut urna ut, sollicitudin fermentum quam. Etiam consectetur commodo dolor et dapibus. Vestibulum nunc magna, sollicitudin vitae scelerisque sit amet, vulputate eget lectus. Cras ut tortor quis purus congue pretium.</p>
				</div>
			</main>

			<div className='links'>
				<Link href='/about/privacy-policy'>
					Privacy Policy
				</Link>
				<Link href='/about/terms-and-conditions'>
					Terms & Conditions
				</Link>
				<Link href='/about/disclaimer'>
					Disclaimer
				</Link>
				<Link href='/about/media-data'>
					Media data
				</Link>
			</div>
		</Container>
	)
}

export default About