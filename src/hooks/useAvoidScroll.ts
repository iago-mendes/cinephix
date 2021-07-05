import {useEffect} from 'react'

export function useAvoidScroll(param: boolean) {
	useEffect(() => {
		if (param) document.body.className = 'avoid-scroll'
		else document.body.className = ''
	}, [param])
}
