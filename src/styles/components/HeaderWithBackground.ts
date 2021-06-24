import styled from 'styled-components'

const Container = styled.header`
	height: 30rem;
	position: relative;

	display: flex;
	align-items: center;
	justify-content: center;

	box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.5);

	.background {
		position: absolute;
		z-index: -1;

		height: 100%;
		width: 100%;
		overflow: hidden;

		img {
			filter: blur(5px);
		}
	}

	h1 {
		padding: 2rem;
		padding-left: 5rem;
		padding-right: 5rem;
		border: ${p => p.theme.primary} 5px solid;

		color: ${p => p.theme.primary};
		font-family: Ubuntu;
		font-weight: 700;
		font-size: 5rem;

		background-color: rgba(0, 0, 0, 0.5);
	}

	@media (max-width: 600px) {
		height: 20rem;

		h1 {
			font-size: 4rem;

			padding: 1rem;
			padding-left: 3rem;
			padding-right: 3rem;
		}
	}
`

export default Container
