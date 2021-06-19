import styled from 'styled-components'

const Container = styled.div`
	background-color: ${p => p.theme.background};
	width: 100vw;
	height: 100vh;

	padding-bottom: 1rem;
	padding-top: 5rem;
	overflow-y: auto;
	overflow-x: hidden;

	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;

	.close
	{
		margin-left: auto;
		margin-right: 1rem;

		button
		{
			width: 30px;
			height: 30px;
			border-radius: 15px;

			background: none;
			border: ${p => p.theme.primary} 2px solid;

			display: flex;
			align-items: center;
			justify-content: center;

			color: ${p => p.theme.primary};
			font-size: 20px;

			transition: background-color 0.25s, color 0.25s;

			:hover
			{
				background-color: ${p => p.theme.primary};
				color: ${p => p.theme.background};
			}
		}
	}

	main
	{
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;

		border: ${p => p.theme.primary} solid 1px;
		border-radius: 0.5rem;

		width: fit-content;
		height: fit-content;
		padding: 1rem;
		margin: 1rem;

		position: relative;

		span
		{
			position: absolute;
			top: -5px;

			background-color: ${p => p.theme.background};
			padding-left: 1rem;
			padding-right: 1rem;

			color: ${p => p.theme.primary};
			font-size: 1rem;
		}

		ins
		{
			background-color: ${p => p.theme.black}40;
		}
	}

	@media (min-width: 1001px)
	{
		width: 50vw;
		height: 90vh;
		padding-top: 12.5rem;

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

		.close
		{
		}
	}
`

export default Container