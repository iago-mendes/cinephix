import styled from 'styled-components'

interface ContainerProps
{
	isModalOpen: boolean
}

const Container = styled.nav<ContainerProps>`
	display: flex;
	align-items: center;
	justify-content: space-between;

	padding: 0.5rem;
	padding-left: 2rem;
	padding-right: 2rem;

	height: 5rem;
	background-color: ${p => p.theme.secondary};

	.logos
	{
		height: 75%;
		width: 20rem;

		display: flex;
		align-items: center;
		justify-content: space-between;

		cursor: pointer;
		transition: 0.25s;

		:hover
		{
			transform: scale(1.05);
		}

		.icon
		{
			width: 20%;
		}

		.name
		{
			width: 75%;
		}
	}

	.container
	{
		display: flex;
		align-items: center;
		gap: 5rem;

		.links
		{
			display: flex;
			align-items: center;
			gap: 2rem;

			a
			{
				text-decoration: none;
				font-family: Ubuntu;
				font-weight: 700;
				font-size: 1.75rem;

				color: ${p => p.theme.primary};
				display: inline-block;

				::after
				{
					content: '';
					width: 0px;
					height: 2px;
					display: block;
					background: ${p => p.theme.primary};
					transition: 0.25s;
				}

				:hover::after
				{
					width: 100%;
				}
			}
		}

		.user
		{
			span
			{
				font-family: Ubuntu;
				font-weight: 700;
				font-size: 1.75rem;
				color: ${p => p.theme.primary};

				border: ${p => p.theme.primary} 2px solid;
				border-radius: 100rem;
				padding: 0.5rem;
				padding-left: 1rem;
				padding-right: 1rem;

				cursor: pointer;
				transition: 0.25s;

				:hover
				{
					background-color: ${p => p.theme.primary};
					color: ${p => p.theme.secondary};
				}
			}

			button
			{
				display: flex;
				align-items: center;
				gap: 1rem;

				height: 3.5rem;

				border: none;
				border-radius: 100rem;
				background: none;
				color: ${p => p.theme.primary};

				cursor: pointer;
				transition: 0.25s;

				:hover
				{
					transform: scale(1.07);
				}

				.img
				{
					max-width: 100%;
					max-height: 100%;
					border-radius: 100rem;
				}

				.indicator
				{
					transition: 0.25s;


					transform: ${p => p.isModalOpen ? 'rotate(-180deg)' : 'rotate(-90deg)'};
				}
			}
		}
	}

	.burger
	{
		button
		{
			background: none;
			border: none;

			display: flex;
			align-items: center;
			justify-content: center;

			color: ${p => p.theme.primary};

			cursor: pointer;
			transition: 0.25s;

			:hover
			{
				transform: scale(1.1);
			}
		}
	}

	@media(max-width: 1000px)
	{
		.logos
		{
			width: 15rem;
		}
	}
`

export default Container