function autoScroll(event: MouseEvent)
{
	const edgeSize = 200
	let timer = null

	const element = document.getElementById('dragDropContainer')

	let viewportX = event.clientX
	let viewportY = event.clientY
	let viewportWidth = window.innerWidth
	const scrollableWidth = element.scrollWidth

	let edgeLeft = edgeSize
	let edgeRight = viewportWidth - edgeSize

	let isInLeftEdge = viewportX < edgeLeft
	let isInRightEdge = viewportX > edgeRight

	if (!(isInLeftEdge || isInRightEdge))
	{
		clearTimeout( timer )
		return
	}

	let maxScrollX = scrollableWidth - viewportWidth;

	(function checkForWindowScroll()
	{
		clearTimeout(timer)
		if (adjustWindowScroll())
			timer = setTimeout(checkForWindowScroll, 30)
	})()

	function adjustWindowScroll()
	{
		console.log('[viewportWidth]', viewportWidth)
		console.log('[viewportX]', viewportX)
		console.log('[viewportY]', viewportY)

		let currentScrollX = window.pageXOffset
		console.log('[element.offsetLeft]', element.offsetLeft)

		let canScrollLeft = ( currentScrollX > 0 )
		let canScrollRight = ( currentScrollX < maxScrollX )

		let nextScrollX = currentScrollX

		let maxStep = 50

		if (isInLeftEdge && canScrollLeft)
		{
			const intensity = (edgeLeft - viewportX) / edgeSize
			nextScrollX = nextScrollX - maxStep * intensity
		}
		else if (isInRightEdge && canScrollRight)
		{
			const intensity = (viewportX - edgeRight) / edgeSize
			nextScrollX = nextScrollX + maxStep * intensity
		}

		nextScrollX = Math.max(0, Math.min(maxScrollX, nextScrollX))

		console.log('[nextScrollX]', nextScrollX)

		if (nextScrollX !== currentScrollX)
		{
			element.scrollTo(nextScrollX, viewportY)
			return true
		}
		else
			return true
	}
}

export default autoScroll