import Container from './styles'
import useDimensions from '../../../hooks/useDimensions'
import {MediumRectangleAd, LargeMobileBannerAd} from '../../../utils/adUnits'

const CardAd: React.FC = () => {
	const {width} = useDimensions()

	return (
		<Container>
			{width > 600 && <MediumRectangleAd />}

			{width <= 600 && <LargeMobileBannerAd />}
		</Container>
	)
}

export default CardAd
