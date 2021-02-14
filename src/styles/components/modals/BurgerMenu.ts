import styled from 'styled-components'

const Container = styled.nav`
	width: 75vw;

	min-height: calc(100vh - 5rem);
	background-color: ${p => p.theme.secondary};

	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	gap: 5rem;

	a
	{
		font-family: Ubuntu;
		font-size: 2.5rem;
		font-weight: 700;

		text-decoration: none;
		color: ${p => p.theme.primary};

		width: fit-content;
		display: inline-block;

		::after
		{
			content: '';
			width: 0px;
			height: 2px;
			display: block;
			background: ${p => p.theme.primary};
			transition: 0.25s;
		}

		:hover::after
		{
			width: 100%;
		}
	}
`

export default Container