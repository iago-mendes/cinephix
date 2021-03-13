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

		max-width: 100%;
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