import styled from 'styled-components'

const Container = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;

	background-color: ${p => p.theme.primary};
	padding: 1rem;
	width: 35rem;
	height: calc((35rem - 2rem) * 0.3 * 1.5 + 2rem);

	border-radius: 1rem;

	text-decoration: none;

	cursor: pointer;
	transition: 0.25s;

	:hover
	{
		border-radius: 0;
		background-color: ${p => p.theme.primary}bf;

		.img img
		{
			border-radius: 0;
		}
	}

	.img
	{
		width: 30%;

		img
		{
			border-radius: 1rem;
			transition: 0.25s;
		}
	}

	.info
	{
		width: 65%;
		height: 100%;

		display: flex;
		flex-direction: column;
		align-items: flex-start;
		justify-content: space-between;

		padding-top: 1rem;
		padding-bottom: 1rem;

		color: ${p => p.theme.background};

		h1
		{
			font-family: Ubuntu;
			font-weight: 700;

			font-size: 2.5rem;
		}

		h2
		{
			font-family: Ubuntu;
			font-weight: 400;

			font-size: 1.5rem;

			display: flex;
			align-items: center;
			justify-content: center;
			gap: 0.5rem;
		}
	}

	@media(max-width: 600px)
	{
		width: 20rem;
		padding: 0.5rem;
		height: calc((20rem - 1rem) * 0.3 * 1.5 + 1rem);

		.info
		{
			h1
			{
				font-size: 1.75rem;
			}

			h2
			{
				font-size: 1.25rem;
			}
		}
	}
`

export default Container