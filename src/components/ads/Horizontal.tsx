import Container from '../../styles/components/ads/Horizontal'
import useDimensions from '../../hooks/useDimensions'
import {LeaderboardAd, LargeMobileBannerAd} from '../../utils/adUnits'

const HorizontalAd: React.FC = () =>
{
	const {width} = useDimensions()

	return (
		<Container>
			<span>Advertisement</span>

			{
				width < 700
					? <LargeMobileBannerAd />
					: <LeaderboardAd />
			}
		</Container>
	)
}

export default HorizontalAd