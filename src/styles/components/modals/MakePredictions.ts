import styled from 'styled-components'

const Container = styled.div`
	color: ${p => p.theme.primary};

	display: flex;
	flex-direction: column;
	justify-content: space-between;
	gap: 2rem;

	width: 100%;
	min-height: 100%;
	padding: 2rem 1rem;

	h1
	{
		font-family: Ubuntu;
		font-size: 2.5rem;
	}

	.category
	{
		display: flex;
		flex-direction: column;
		gap: 1rem;

		width: 90%;
		padding-left: 1.5rem;

		label
		{
			color: ${p => p.theme.primary};
			font-weight: 700;
			font-size: 2rem;

			border-left: ${p => p.theme.primary} 5px solid;
			padding-left: 1rem;
			margin-left: -1.5rem;
		}
	}

	.buttons
	{
		display: flex;
		align-items: center;
		justify-content: space-around;

		width: 100%;

		button
		{
			display: flex;
			align-items: center;
			justify-content: center;

			border: none;
			background: none;

			width: 4rem;
			height: 4rem;
			border-radius: 100rem;

			cursor: pointer;
			transition: 0.25s;

			:hover
			{
				color: ${p => p.theme.background};
			}
		}

		.cancel
		{
			color: ${p => p.theme.delete};
			border: ${p => p.theme.delete} 2px solid;

			:hover
			{
				background-color: ${p => p.theme.delete}
			}
		}

		.confirm
		{
			color: ${p => p.theme.confirm};
			border: ${p => p.theme.confirm} 2px solid;

			:hover
			{
				background-color: ${p => p.theme.confirm}
			}
		}
	}
`

export default Container