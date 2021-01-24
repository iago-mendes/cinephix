const tvshowLabels: {[ratingKey: string]: string} =
{
	engagement: 'Engagement',
	consistency: 'Consistency',
	screenplay: 'Screenplay',
	acting: 'Acting',
	cinematography: 'Cinematography',
	musicAndSound: 'Music and sound'
}

const movieLabels: {[ratingKey: string]: string} =
{
	screenplay: 'Screenplay',
	pacing: 'Pacing',
	acting: 'Acting',
	cinematography: 'Cinematography',
	musicAndSound: 'Music and sound'
}

function getRatingLabel(type: string, ratingKey: string)
{
	if (type === 'movie')
		return movieLabels[ratingKey]
	else if (type === 'tvshow')
		return tvshowLabels[ratingKey]
}

export default getRatingLabel