import Image from 'next/image'

import Container from '../styles/components/HeaderWithBackground'

interface HeaderWithBackgroundProps
{
	background: string
	display: string
}

const HeaderWithBackground: React.FC<HeaderWithBackgroundProps> = ({background, display, children}) =>
{
	return (
		<Container>
			<div className='background'>
				<Image src={background} width={1500} height={1000} layout='responsive' quality={10} />
			</div>
			<h1>{display}</h1>
			{children}
		</Container>
	)
}

export default HeaderWithBackground