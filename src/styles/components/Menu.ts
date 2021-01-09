import styled from 'styled-components'

const Container = styled.nav`
	display: flex;
	align-items: center;
	justify-content: space-between;

	padding: 0.5rem;
	padding-left: 2rem;
	padding-right: 2rem;

	height: 5rem;
	background-color: ${p => p.theme.blue};

	.logo
	{
		height: 100%;

		cursor: pointer;
		transition: 0.25s;

		:hover
		{
			transform: scale(1.05);
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

				color: ${p => p.theme.orange};
				display: inline-block;

				::after
				{
					content: '';
					width: 0px;
					height: 2px;
					display: block;
					background: ${p => p.theme.orange};
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
			display: flex;
			align-items: center;
			gap: 1rem;

			span
			{
				font-family: Ubuntu;
				font-weight: 700;
				font-size: 1.75rem;
				color: ${p => p.theme.orange};

				border: ${p => p.theme.orange} 2px solid;
				border-radius: 100rem;
				padding: 0.5rem;
				padding-left: 1rem;
				padding-right: 1rem;

				cursor: pointer;
				transition: 0.25s;

				:hover
				{
					background-color: ${p => p.theme.orange};
					color: ${p => p.theme.blue};
				}
			}

			button
			{
				display: flex;
				align-items: center;
				justify-content: center;

				border: none;
				border-radius: 100rem;
				background: none;
				color: ${p => p.theme.orange};

				cursor: pointer;
				transition: 0.25s;

				:hover
				{
					transform: scale(1.1);
				}
			}
		}
	}
`

export default Container