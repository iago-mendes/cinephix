import Container from '../../styles/components/ads/Banner'

const BannerAd: React.FC = () =>
{
	return null

	return (
		<Container>
			<script
				async
				src='https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js'
			/>
			<ins
				className='adsbygoogle'
				data-ad-client='ca-pub-7920836956538831'
				data-ad-slot='8065342993'
				style={{display: 'block'}}
				data-ad-format='auto'
				data-full-width-responsive='true'
			/>
			<script>
				(adsbygoogle = window.adsbygoogle || []).push({});
			</script>
		</Container>
	)
}

export default BannerAd