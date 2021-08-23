import {createContext, ReactNode, useState, useEffect} from 'react'

type DimensionsContextData = {
	width: number
	height: number
	inMobile: boolean
	inDesktop: boolean
}

export const DimensionsContext = createContext({} as DimensionsContextData)

export function DimensionsProvider({children}: {children: ReactNode}) {
	const [width, setWidth] = useState(360)
	const [height, setHeight] = useState(640)

	const inMobile = width < 800
	const inDesktop = width >= 800

	useEffect(() => {
		updateDimensions()
		window.addEventListener('resize', updateDimensions, {passive: true})

		return () => window.removeEventListener('resize', updateDimensions)
	}, [])

	function updateDimensions() {
		setWidth(window.innerWidth)
		setHeight(window.innerHeight)
	}

	return (
		<DimensionsContext.Provider value={{width, height, inMobile, inDesktop}}>
			{children}
		</DimensionsContext.Provider>
	)
}
