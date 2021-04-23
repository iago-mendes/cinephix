import styled from 'styled-components'

const Container = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;

	header
	{
		width: 100%;
		box-shadow: 0px 5px 5px rgba(0,0,0,0.5);

		.img
		{
			width: 100%;
		}
	}

	section
	{
		color: ${p => p.theme.primary};

		display: flex;
		flex-direction: column;
		gap: 1rem;

		width: 100%;
		padding: 3rem 0;

		border-top: ${p => p.theme.primary} 2px solid;

		:first-of-type
		{
			border: none;
		}
		
		h2
		{
			color: ${p => p.theme.primary};
			font-weight: 700;
			font-size: 2.5rem;

			border-left: ${p => p.theme.primary} 5px solid;
			padding-left: 1rem;
			margin-left: 1rem;
		}
	}

	section.group
	{
		width: 90%;

		.nickname
		{
			font-family: Ubuntu;
			font-size: 3rem;
		}

		.description
		{
			font-size: 2rem;
		}
	}

	section.actions
	{
		display: grid;
		grid-auto-rows: 5rem;
		grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));
		grid-gap: 1rem;
		align-items: center;
		justify-items: center;

		a, button
		{
			max-width: 20rem;
			max-height: 5rem;

			background: none;
			border: ${p => p.theme.primary} 2px solid;
			border-radius: 100rem;
			padding: 0.75rem 2rem;

			color: ${p => p.theme.primary};
			font-family: Ubuntu;
			font-weight: 700;
			font-size: 1.75rem;

			transition: 0.25s;

			:hover
			{
				background-color: ${p => p.theme.primary};
				color: ${p => p.theme.background};

				transform: scale(1.1);
			}
		}
	}

	section.participants
	{
		.participant
		{
			background-color: ${p => p.theme.primary};
			color: ${p => p.theme.background};
			box-shadow: 5px 5px 5px rgba(0,0,0,0.5);

			width: 25rem;
			padding: 0.5rem;
			border-radius: 0.5rem;

			display: flex;
			gap: 1rem;

			position: relative;

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
				width: 10rem;
				height: 10rem;

				img
				{
					border-radius: 0.5rem;
					transition: 0.25s;
				}
			}

			.info
			{
				display: flex;
				flex-direction: column;
				justify-content: space-between;

				width: calc(25rem - 10rem - 1rem - 1rem);
				padding: 1rem 0;

				span
				{
					font-size: 1.5rem;
				}

				.name
				{
					font-weight: 700;
				}
			}
		}
	}

	section.event
	{
		padding-bottom: 0;

		.category
		{
			display: flex;
			flex-direction: column;
			gap: 1rem;

			padding: 2rem 0;

			:nth-child(odd)
			{
				background-color: rgba(0,0,0,0.5);
			}

			h3
			{
				font-size: 2rem;
				margin-left: 3rem;
			}

			.guesses
			{
				position: absolute;
				bottom: 0.5rem;
				right: 0.5rem;

				width: 5rem;
				height: 5rem;

				background-color: ${p => p.theme.background};
				border: none;
				border-radius: 2.5rem;
				box-shadow: 0px 0px 5px rgba(0,0,0,0.5);

				color: ${p => p.theme.primary};
				font-family: Ubuntu;
				font-weight: 700;
				font-size: 1.75rem;
			}
		}
	}

	@media(min-width: 1000px)
	{
		header
		{
			height: 30rem;
			overflow: hidden;

			display: flex;
			align-items: center;
		}
	}
`

export default Container