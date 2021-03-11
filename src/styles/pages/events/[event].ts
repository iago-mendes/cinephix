import styled from 'styled-components'

interface ContainerProps
{
	color: string
}

const Container = styled.div<ContainerProps>`
	header
	{
		width: 100%;
		padding: 2rem;

		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 2rem;

		color: ${p => p.color};
		border-bottom: ${p => p.color} 2px solid;
		box-shadow: 0px 5px 5px rgba(0,0,0,0.5);

		.name
		{
			font-family: Ubuntu;
			font-size: 3rem;
			font-weight: 700;
		}

		.description
		{
			font-size: 2rem;
			text-align: justify;
		}
	}
`

export default Container