import styled from 'styled-components'

const Container = styled.div`
	width: 20rem;

	.detail
	{
		display: flex;
		justify-content: flex-end;
		padding-right: 3rem;

		color: ${p => p.theme.primary};
	}

	main
	{
		margin-top: -3px;
		background-color: ${p => p.theme.primary};
		border-radius: 0.5rem;

		box-shadow: 0px 0px 10px rgba(0,0,0);

		.session
		{
			display: flex;
			flex-direction: column;
			align-items: center;
			gap: 1rem;

			padding: 1rem;
			border-bottom: ${p => p.theme.background} 1px solid;

			p
			{
				font-family: Roboto;
				font-size: 1.5rem;
				color: ${p => p.theme.background};
				word-break: break-all;
			}

			button
			{
				display: flex;
				align-items: center;
				justify-content: center;
				gap: 0.5rem;

				background: none;
				border: ${p => p.theme.background} 1px solid;
				padding: 0.5rem;
				border-radius: 0.5rem;

				color: ${p => p.theme.background};
				cursor: pointer;
				transition: 0.25s;

				:hover
				{
					color: ${p => p.theme.primary};
					background-color: ${p => p.theme.background};
				}

				span
				{
					font-family: Ubuntu;
					font-weight: 700;
					font-size: 1.5rem;
				}
			}
		}

		.links
		{
			display: flex;
			flex-direction: column;
			gap: 1.5rem;

			padding: 1.5rem;
			padding-left: 2.5rem;

			a
			{
				font-family: Ubuntu;
				font-size: 1.75rem;
				font-weight: 700;

				text-decoration: none;
				color: ${p => p.theme.background};

				width: fit-content;
				display: inline-block;

				::after
				{
					content: '';
					width: 0px;
					height: 2px;
					display: block;
					background: ${p => p.theme.background};
					transition: 0.25s;
				}

				:hover::after
				{
					width: 100%;
				}
			}
		}
	}
`

export default Container