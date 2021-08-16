import {ReactNode} from 'react'
import {i18n} from '@lingui/core'
import {I18nProvider as LinguiProvider} from '@lingui/react'
import {useRouter} from 'next/router'

import {en, pt} from 'make-plural/plurals'

i18n.loadLocaleData('en', {plurals: en})
i18n.loadLocaleData('en-US', {plurals: en})
i18n.loadLocaleData('pt', {plurals: pt})
i18n.loadLocaleData('pt-BR', {plurals: pt})

import {messages as enUSMessages} from '../locales/en-US/messages'
import {messages as ptBRMessages} from '../locales/pt-BR/messages'

i18n.load('en-US', enUSMessages)
i18n.load('en', enUSMessages)
i18n.load('pt-BR', ptBRMessages)
i18n.load('pt', ptBRMessages)

const validLocales = ['en-US', 'en', 'pt-BR', 'pt']

type Props = {
	children: ReactNode
}

export function I18nHandler({children}: Props) {
	const {locale: routerLocale} = useRouter()

	const locale =
		routerLocale && validLocales.includes(routerLocale)
			? routerLocale
			: validLocales[0]

	i18n.activate(locale)

	return <LinguiProvider i18n={i18n}>{children}</LinguiProvider>
}
