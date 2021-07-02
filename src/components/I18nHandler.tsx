import {ReactNode} from 'react'
import {i18n} from '@lingui/core'
import {I18nProvider as LinguiProvider} from '@lingui/react'
import {useRouter} from 'next/router'

import {messages as enUSMessages} from '../locales/en-US/messages'
import {messages as ptBRMessages} from '../locales/pt-BR/messages'

i18n.load('en-US', enUSMessages)
i18n.load('pt-BR', ptBRMessages)

const validLocales = ['en-US', 'pt-BR']

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
