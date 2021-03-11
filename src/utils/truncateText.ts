export default function truncateText(text: string | undefined, length: number)
{
	if (!text)
		return ''

	let truncated = text

	if (truncated.length > length)
		truncated = truncated.substr(0, length-3) + '...'

	return truncated
}