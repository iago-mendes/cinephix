import styled from 'styled-components'

const Container = styled.div`
	main
	{
		display: grid;
		grid-auto-rows: calc((40rem - 2rem) * 0.3 * 1.5 + 2rem);
		grid-template-columns: repeat(auto-fill, minmax(40rem, 1fr));
		grid-gap: 2rem;
		align-items: center;
		justify-items: center;
		
		padding: 1rem;
		margin-top: 2rem;
	}
`

export default Container