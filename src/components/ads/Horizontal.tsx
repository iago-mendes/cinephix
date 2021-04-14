import Container from '../../styles/components/ads/Horizontal'
import useDimensions from '../../hooks/useDimensions'
import {LeaderboardAd, LargeMobileBannerAd} from '../../utils/adUnits'

const HorizontalAd: React.FC = () =>
{
	const {width} = useDimensions()

	if (width < 360)
		return null

	return (
		<Container>
			<span>Advertisement</span>

			{width >= 800 && (
				<LeaderboardAd />
			)}

			{width < 800 && (
				<LargeMobileBannerAd />
			)}
		</Container>
	)
}

export default HorizontalAd