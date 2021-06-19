import {useEffect, useState} from 'react'

function useDimensions()
{
	const [width, setWidth] = useState(360)
	const [height, setHeight] = useState(640)
	let oldHeight = 640

	const inMobile = width <= 1000
	const inDesktop = width > 1000

	const [isVirtualKeyboardOpen, setIsVirtualKeyboardOpen] = useState(false)
	
	useEffect(() =>
	{
		updateDimensions()
		window.addEventListener('resize', updateDimensions, {passive: true})

		return () => window.removeEventListener('resize', updateDimensions)
	}, [])

	function updateDimensions()
	{
		const newHeight = window.innerHeight
		
		const tmpIsVirtualKeyboardOpen = inMobile && newHeight < oldHeight
		setIsVirtualKeyboardOpen(tmpIsVirtualKeyboardOpen)
		oldHeight = newHeight

		setWidth(window.innerWidth)
		setHeight(window.innerHeight)
	}

	return {width, height, inMobile, inDesktop, isVirtualKeyboardOpen}
}

export default useDimensions