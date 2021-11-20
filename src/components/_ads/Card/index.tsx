import Container from './styles'
import useDimensions from '../../../hooks/useDimensions'
import {MediumRectangleAd, LargeMobileBannerAd} from '../adUnits'

const CardAd: React.FC = () => {
	return null
	const {width} = useDimensions()

	return (
		<Container>
			{width < 600 && <LargeMobileBannerAd />}

			{width >= 600 && <MediumRectangleAd />}
		</Container>
	)
}

export default CardAd
