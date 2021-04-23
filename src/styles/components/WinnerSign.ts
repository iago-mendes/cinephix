import styled from 'styled-components'

const Container = styled.div`
	position: absolute;
	right: -2.5rem;
	top: 0;

	color: #ffbf00;
	font-size: 7.5rem;
	transform: rotate(45deg);

	z-index: 1;

	svg
	{
		stroke: ${p => p.theme.background};
		stroke-width: 1rem;
	}
`

export default Container