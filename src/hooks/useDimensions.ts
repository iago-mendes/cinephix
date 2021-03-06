import {useEffect, useState} from 'react'

function useDimensions()
{
	const [width, setWidth] = useState(600)
	const [height, setHeight] = useState(800)
	
	useEffect(() =>
	{
		updateDimensions()
		window.addEventListener('resize', updateDimensions)

		return () => window.removeEventListener('resize', updateDimensions)
	}, [])

	function updateDimensions()
	{
		setWidth(window.innerWidth)
		setHeight(window.innerHeight)
	}

	return {width, height}
}

export default useDimensions