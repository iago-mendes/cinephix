import styled from 'styled-components'

const Container = styled.div`
	position: absolute;
	bottom: -2rem;

	background-color: ${p => p.theme.white};
	width: 50rem;
	height: 4rem;

	display: flex;
	align-items: center;
	gap: 1rem;

	padding-left: 1rem;
	padding-right: 2rem;

	color: ${p => p.theme.secondary};
	box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.5);

	border-radius: 2rem;
	transition: border-radius 0.25s;

	:hover {
		border-radius: 0;
	}

	input {
		width: 100%;
		height: 90%;

		font-family: Ubuntu;
		font-weight: 700;
		font-size: 2rem;

		color: ${p => p.theme.secondary};
		background: none;
		border: none;
	}

	@media (max-width: 1000px) {
		width: 75vw;
		max-width: 50rem;

		input {
			font-size: 1.5rem;
		}
	}
`

export default Container
