import styled from 'styled-components'

const Container = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;

	background-color: ${p => p.theme.red};
	width: 50rem;
	padding: 1rem;

	border-radius: 1rem;

	.img
	{
		width: 20%;

		img
		{
			border-radius: 1rem;
		}
	}

	.info
	{
		width: 75%;

		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 1rem;

		color: ${p => p.theme.white};

		h1
		{
			font-family: Ubuntu;
			font-weight: 700;

			font-size: 2.5rem;
		}

		h3
		{
			font-family: Ubuntu;
			font-weight: 400;

			font-size: 1.5rem;
		}

		p
		{
			font-family: Roboto;
			font-weight: 400;

			font-size: 1.5rem;
		}

	}
`

export default Container