import {format, Locale} from 'date-fns'
import {enUS, ptBR} from 'date-fns/locale'
import {useRouter} from 'next/router'

const locales = {
	'en-US': enUS,
	'pt-BR': ptBR
}

export function formatDate(unformatedDate: string | undefined) {
	if (!unformatedDate || unformatedDate === '') return ''

	const date = new Date(unformatedDate)

	const {locale: routerLocale} = useRouter()
	const locale: Locale = Object.keys(locales).includes(routerLocale)
		? locales[routerLocale]
		: enUS

	const formatedDate = format(date, 'MMMM d, y', {locale})
	const capitalizedDate =
		formatedDate.charAt(0).toLocaleUpperCase() + formatedDate.slice(1)
	return capitalizedDate
}

export default formatDate
