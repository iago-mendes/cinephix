import {useRouter} from 'next/router'
import {useEffect} from 'react'

import {pageview} from '../utils/gtag'

export function useAnalytics() {
	const {events} = useRouter()

	useEffect(() => {
		events.on('routeChangeComplete', handleRouteChange)
		return () => events.off('routeChangeComplete', handleRouteChange)
	}, [events])

	function handleRouteChange(url: URL) {
		pageview(url)
	}
}
