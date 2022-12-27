import {useRef, useEffect} from 'react'

const useClickOutside = (action: () => void) => {
	const ref = useRef(null)

	useEffect(() => {
		function handleClickOutside(e: MouseEvent) {
			if (ref.current && !ref.current.contains(e.target)) action()
		}

		document.addEventListener('mousedown', handleClickOutside)

		return () => {
			document.removeEventListener('mousedown', handleClickOutside)
		}
	}, [action, ref])

	return ref
}

export default useClickOutside
