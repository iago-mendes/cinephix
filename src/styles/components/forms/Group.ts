import styled from 'styled-components'

const Container = styled.form`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 2rem;

	padding-bottom: 2rem;
	
	header
	{
		width: 100%;
		box-shadow: 0px 5px 5px rgba(0,0,0,0.5);

		position: relative;

		button
		{
			position: absolute;
			bottom: 1rem;
			right: 1rem;

			background-color: ${p => p.theme.background}bf;
			border: ${p => p.theme.primary} 2px solid;
			border-radius: 1rem;
			padding: 1rem 2rem;


			color: ${p => p.theme.primary};
			font-family: Ubuntu;
			font-weight: 700;
			font-size: 1.5rem;

			transition: 0.25s;

			:hover
			{
				background-color: ${p => p.theme.primary};
				color: ${p => p.theme.background};

				transform: scale(1.1);
			}
		}
	}

	.field
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

	.text
	{
		input
		{
			background-color: ${p => p.theme.textBlack}40;
			border: none;
			border-bottom: ${p => p.theme.primary}40 2px solid;

			font-size: 1.75rem;
			color: ${p => p.theme.primary};

			padding: 0.5rem 1rem;

			transition: 0.25s;
		
			:focus, :hover
			{
				border-bottom-color: ${p => p.theme.primary};
			}
		}

		textarea
		{
			background-color: ${p => p.theme.textBlack}40;
			resize: vertical;
			padding: 1rem;
			border: ${p => `${p.theme.primary}40`} 2px solid;
			border-radius: 0.5rem;

			font-size: 1.75rem;
			color: ${p => p.theme.primary};

			transition: border 0.25s;

			:focus, :hover
			{
				border-color: ${p => p.theme.primary};
			}
		}
	}

	ul.list
	{
		list-style: none;

		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1rem;

		button
		{
			display: flex;
			align-items: center;
			justify-content: center;

			color: ${p => p.theme.background};
			background-color : ${p => p.theme.primary};
			border: none;
			border-radius: 10rem;

			transition: 0.25s;

			:hover
			{
				color: ${p => p.theme.background};
			}
		}

		li
		{
			display: flex;
			align-items: center;
			justify-content: space-between;

			width: 100%;

			input
			{
				width: 85%;
			}

			button.remove:hover
			{
				background-color: ${p => p.theme.delete};
			}
		}

		button.add:hover
		{
			background-color: ${p => p.theme.confirm};
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

	@media(min-width: 1000px)
	{
		header
		{
			height: 30rem;
			overflow: hidden;

			display: flex;
			align-items: center;

			.img
			{
				width: 100%;
			}
		}

		.field
		{
			width: 60%;
		}
	}
`

export default Container