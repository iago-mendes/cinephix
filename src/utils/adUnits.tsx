import { useEffect } from 'react'

declare global
{
	interface Window
	{
		adsbygoogle: any
	}
}

function adScript()
{
	if (process.env.NEXT_PUBLIC_NODE_ENV === 'development')
		return

	window.adsbygoogle = window.adsbygoogle || []
	window.adsbygoogle.push({})
}

export const LeaderboardAd: React.FC = () => {
	useEffect(() =>
	{
		adScript()
	}, [])

	return (
		<ins
			className='adsbygoogle'
			style=
				{{
					display: 'inline-block',
					width: '728px',
					height: '90px'
				}}
			data-ad-client='ca-pub-7920836956538831'
			data-ad-slot='7349825410'
		/>
	)
}

export const MediumRectangleAd: React.FC = () => {
	useEffect(() =>
	{
		adScript()
	}, [])

	return (
		<ins
			className='adsbygoogle'
			style=
				{{
					display: 'inline-block',
					width: '300px',
					height: '250px'
				}}
			data-ad-client='ca-pub-7920836956538831'
			data-ad-slot='7697309778'
		/>
	)
}

export const LargeMobileBannerAd: React.FC = () => {
	useEffect(() =>
	{
		adScript()
	}, [])

	return (
		<ins
			className='adsbygoogle'
			style=
				{{
					display: 'inline-block',
					width: '320px',
					height: '100px'
				}}
			data-ad-client='ca-pub-7920836956538831'
			data-ad-slot='6001084721'
		/>
	)
}

export const LargeSkyscraperAd: React.FC = () => {
	useEffect(() =>
	{
		adScript()
	}, [])

	return (
		<ins
			className='adsbygoogle'
			style=
				{{
					display: 'inline-block',
					width: '300px',
					height: '600px'
				}}
			data-ad-client='ca-pub-7920836956538831'
			data-ad-slot='9673898511'
		/>
	)
}