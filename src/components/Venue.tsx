import {venues} from '../assets/db/venues'

type Props = {
	venue: string
}

export function Venue({venue}: Props) {
	function getColor() {
		const venueOption = venues.find(({name}) => name === venue)

		if (!venueOption) return '#000000'
		else return venueOption.color
	}

	return (
		<>
			<svg width={15} height={15}>
				<circle cx={7.5} cy={7.5} r={7.5} fill={getColor()} />
			</svg>
			<span style={{marginLeft: 5}}>{venue}</span>
		</>
	)
}
