import { useEffect, useState } from 'react'
import { FiX } from 'react-icons/fi'
import useDimensions from '../../hooks/useDimensions'

import Container from '../../styles/components/ads/Banner'
import HorizontalAd from './Horizontal'

const BannerAd: React.FC = () =>
{
	const [show, setShow] = useState(false)
	const {width} = useDimensions()

	useEffect(() =>
	{
		setTimeout(() => setShow(true), 10 * 1000)
	}, [])

	if (width < 360 || !show)
		return null

	return (
		<Container>
			<div className='closeContainer'>
				<button onClick={() => setShow(false)} >
					<FiX />
				</button>
			</div>

			<HorizontalAd />
		</Container>
	)
}

export default BannerAd