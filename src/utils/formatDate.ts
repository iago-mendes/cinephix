export default function formatDate(unformatedDate: string | undefined)
{
	const months =
	[
		'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
	]

	if (!unformatedDate || unformatedDate === '')
		return ''

	const date = unformatedDate.split('-').map(s => Number(s))
	const formatedDate = `${months[date[1]-1]} ${date[2]}, ${date[0]}`
	return formatedDate
}