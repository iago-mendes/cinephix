import styled from 'styled-components'

const Container = styled.div`
	position: absolute;
	bottom: -2rem;
	z-index: 1;

	background-color: ${p => p.theme.white};
	width: 50rem;
	height: 4rem;

	display: flex;
	align-items: center;
	gap: 1rem;

	padding-left: 1rem;
	padding-right: 2rem;

	color: ${p => p.theme.secondary};
	box-shadow: 0px 5px 5px rgba(0,0,0,0.5);

	border-radius: 100rem;
	transition: 0.25s;

	:hover
	{
		transform: scale(1.03);
	}

	input
	{
		width: 100%;
		height: 90%;

		font-family: Ubuntu;
		font-weight: 700;
		font-size: 2rem;

		color: ${p => p.theme.secondary};
		background: none;
		border: none;
	}

	@media(max-width: 1000px)
	{
		width: 75vw;
		max-width: 50rem;
	}
`

export default Container