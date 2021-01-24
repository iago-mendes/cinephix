import styled from 'styled-components'

const Container = styled.div`
	width: 75vw;
	height: 85vh;

	background-color: ${p => p.theme.background};
	border-radius: 0.5rem;

	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-between;

	header
	{
		display: flex;
		align-items: center;
		justify-content: space-between;

		width: 100%;
		padding: 0.5rem;
		padding-left: 2rem;
		padding-right: 2rem;

		border-top-left-radius: 0.5rem;
		border-top-right-radius: 0.5rem;
		background-color: ${p => p.theme.secondary};

		h1
		{
			color: ${p => p.theme.primary};
			font-family: Ubuntu;
		}

		button
		{
			width: 3.5rem;
			height: 3.5rem;
			border-radius: 100rem;

			background: none;
			border: none;
			color: ${p => p.theme.primary};

			display: flex;
			align-items: center;
			justify-content: center;

			cursor: pointer;
			transition: 0.25s;

			:hover
			{
				background-color: ${p => p.theme.primary};
				color: ${p => p.theme.secondary};
			}
		}
	}

	.search
	{
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
	}

	.scroll
	{
		width: 100%;
		height: calc(85vh - 12rem);
		overflow-y: auto;

		::-webkit-scrollbar
		{
			height: 1rem;
			width: 1rem;
		}

		::-webkit-scrollbar-track
		{
			background-color: #242329;
			border-radius: 1rem;
		}
		
		::-webkit-scrollbar-thumb
		{
			background-color: #4d4d5a;
			border-radius: 1rem;

			:hover
			{
				background-color: #3b3b45;
			}
		}
	}
`

export default Container