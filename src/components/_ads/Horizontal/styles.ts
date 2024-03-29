import styled from 'styled-components'

const Container = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;

	border: ${p => p.theme.primary} solid 1px;
	border-radius: 0.5rem;

	width: fit-content;
	height: fit-content;
	padding: 1rem;
	margin: 1rem;

	position: relative;

	span {
		position: absolute;
		top: -5px;

		background-color: ${p => p.theme.background};
		padding-left: 1rem;
		padding-right: 1rem;

		color: ${p => p.theme.primary};
		font-size: 1rem;
	}

	> div {
		background-color: ${p => p.theme.black}40;

		width: 320px;
		height: 100px;

		@media (min-width: 800px) {
			width: 728px;
			height: 90px;
		}
	}
`

export default Container
