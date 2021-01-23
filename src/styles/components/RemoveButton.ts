import styled from 'styled-components'

const Container = styled.button`
	position: absolute;
	top: 2rem;
	right: 2rem;

	background: none;
	border: none;
	color: ${p => p.theme.delete};

	width: 4rem;
	height: 4rem;
	border-radius: 100rem;

	display: flex;
	align-items: center;
	justify-content: center;

	cursor: pointer;
	transition: 0.25s;

	:hover
	{
		background-color: ${p => p.theme.delete};
		color: ${p => p.theme.background};

		transform: scale(1.2);
	}
`

export default Container