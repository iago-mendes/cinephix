import styled from 'styled-components'

const Container = styled.footer`
	background-color: ${p => p.theme.black};
	padding: 3rem;

	display: flex;
	align-items: center;
	justify-content: space-between;

	.logo
	{
		width: 25%;

		display: flex;
		align-items: center;
		justify-content: center;

		img
		{
			width: 100%;
		}
	}

	.info
	{
		width: 70%;
		height: 100%;

		display: flex;
		flex-direction: column;
		align-items: flex-end;
		gap: 2rem;

		.links
		{
			width: 100%;

			display: flex;
			align-items: center;
			justify-content: space-between;

			a
			{
				font-family: Ubuntu;
				font-weight: 700;
				font-size: 2rem;

				color: ${p => p.theme.primary};
				text-decoration: none;

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

		.attribution
		{
			font-family: Roboto;
			font-size: 1.25rem;
			
			color: ${p => p.theme.gray};

			a
			{
				color: ${p => p.theme.gray};
			}
		}
	}
`

export default Container