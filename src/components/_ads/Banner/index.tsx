import {useEffect, useState} from 'react'
import {FiX} from 'react-icons/fi'

import Container from './styles'
import HorizontalAd from '../Horizontal'
import useDimensions from '../../../hooks/useDimensions'

const BannerAd: React.FC = () => {
	return null
	const [show, setShow] = useState(false)
	const {inMobile} = useDimensions()

	useEffect(() => {
		setTimeout(() => setShow(true), 10 * 1000)
	}, [])

	if (inMobile || !show) return null

	return (
		<Container>
			<div className="closeContainer">
				<button onClick={() => setShow(false)}>
					<FiX />
				</button>
			</div>

			<HorizontalAd />
		</Container>
	)
}

export default BannerAd
