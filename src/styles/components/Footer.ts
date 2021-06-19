import styled from 'styled-components'

const Container = styled.footer`
	background-color: ${p => p.theme.black};
	padding: 3rem;

	display: flex;
	align-items: center;
	justify-content: space-between;

	.logos
	{
		width: 25%;

		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1rem;

		cursor: pointer;
		transition: 0.25s;

		:hover
		{
			transform: scale(1.05);
		}

		.icon
		{
			width: 25%;
		}

		.name
		{
			width: 100%;
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
			text-decoration: underline;
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

			display: grid;
			grid-auto-rows: 3rem;
			grid-template-columns: repeat(auto-fill, minmax(13.5rem, 1fr));
			grid-gap: 1rem;
			align-items: center;
			justify-items: center;

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
	}

	@media(max-width: 1000px)
	{
		justify-content: center;
		padding: 1rem;
	}
`

export default Container