import styled from 'styled-components'

const Container = styled.div`
	width: 75vw;
	height: 75vh;

	header
	{
		display: flex;
		align-items: center;
		justify-content: space-between;

		height: 5rem;
		padding: 0.5rem;
		padding-left: 2rem;
		padding-right: 2rem;

		border-top-left-radius: 0.5rem;
		border-top-right-radius: 0.5rem;
		background-color: ${p => p.theme.secondary};

		button, a
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

	main
	{
		background-color: ${p => p.theme.background};
		width: 100%;
		height: calc(75vh - 5rem);

		overflow-y: auto;
		overflow-x: hidden;

		::-webkit-scrollbar
		{
			width: 1rem;
		}

		::-webkit-scrollbar-track
		{
			background-color: ${p => p.theme.primary}26;
		}
		
		::-webkit-scrollbar-thumb
		{
			background-color: ${p => p.theme.primary};

			:hover
			{
				background-color: ${p => p.theme.primary}bf;
			}
		}
	}

	@media(max-width: 1000px)
	{
		width: 95vw;
		height: 85vh;

		main
		{
			height: calc(85vh - 5rem);
		}
	}
`

export default Container