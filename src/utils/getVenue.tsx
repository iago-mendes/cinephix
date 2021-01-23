function getVenue(venue: string)
{
	function getColor()
	{
		if (venue === 'Netflix')
			return '#ce0e0e'
		if (venue === 'Prime Video')
			return '#1ebbff'
		if (venue === 'Disney+')
			return '#2a22c4'
		if (venue === 'HBO Max')
			return '#861398'
		if (venue === 'Movie Theater')
			return '#803710'
		if (venue === 'Other')
			return '#656565'
	}

	return (
		<>
			<svg width={15} height={15} >
				<circle cx={7.5} cy={7.5} r={7.5} fill={getColor()} />
			</svg>
			<span style={{marginLeft: 5}} >{venue}</span>
		</>
	)
}

export default getVenue