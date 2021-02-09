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
				transform: scale(1.1);
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
		width: calc(100vw - 2rem)
	}
`

export default Container