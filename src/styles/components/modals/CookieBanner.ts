import styled from 'styled-components'

const Container = styled.div`
	position: relative;

	width: 50vw;
	padding: 1rem;
	border-radius: 1rem;

	background-color: ${p => p.theme.background};
	box-shadow: 0px 0px 10px #000;

	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: 1rem;

	.message
	{
		color: ${p => p.theme.primary};

		width: 75%;

		h2
		{
			font-family: Ubuntu;
			font-size: 2rem;
		}

		p
		{
			font-family: Roboto;
			font-size: 1.75rem;
		}
	}

	.buttons
	{
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1rem;

		button
		{
			font-family: Ubuntu;
			font-size: 1.75rem;

			background-color: ${p => p.theme.gray};
			color: ${p => p.theme.background};

			border: none;
			border-radius: 0.5rem;
			padding: 0.5rem;

			cursor: pointer;
			transition: 0.25s;

			:hover
			{
				transform: scale(1.05);
			}
		}

		.accept
		{
			background-color: ${p => p.theme.primary};
			padding-left: 2rem;
			padding-right: 2rem;

			font-weight: 700;
		}
	}

	#close
	{
		position: absolute;
		right: 0.5rem;
		top: 0.5rem;

		border: none;
		background: none;
		color: ${p => p.theme.primary};

		cursor: pointer;
	}

	@media(max-width: 1000px)
	{
		margin-left: 1rem;
		width: calc(100vw - 3rem);

		.message
		{
			h2
			{
				font-size: 1.5rem;
			}

			p
			{
				font-size: 1.25rem;
			}
		}

		.buttons button
		{
			font-size: 1.5rem;
		}
	}
`

export default Container