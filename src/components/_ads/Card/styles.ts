import styled from 'styled-components'

const Container = styled.div`
	background-color: ${p => p.theme.black}40;

	width: 320px;
	height: 100px;

	@media (min-width: 600px) {
		width: 300px;
		height: 250px;
	}
`

export default Container
