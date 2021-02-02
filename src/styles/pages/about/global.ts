import styled from 'styled-components'

const Container = styled.div`
	background-color: ${p => p.theme.green};
	padding: 2rem;
	
	main
	{
		color: ${p => p.theme.textBlack};
		font-family: Roboto;
		font-size: 1.5rem;

		display: flex;
		flex-direction: column;
		gap: 0.5rem;

		h1, h2
		{
			margin-top: 1rem;
			margin-bottom: 0.5rem;
		}

		p
		{
			text-indent: 2rem;
		}

		ul li
		{
			margin-left: 5rem;
			list-style-type: disc;
		}

		a
		{
			text-decoration: none;
			color: ${p => p.theme.textBlack};
			font-weight: 700;

			:hover
			{
				text-decoration: underline;
			}
		}
	}

	@media(max-width: 700px)
	{
		main a
		{
			word-break: break-all;
		}
	}
`

export default Container