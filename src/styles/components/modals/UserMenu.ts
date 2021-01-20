import styled from 'styled-components'
import Modal from 'react-modal'

const Container = styled.div`
	width: 20rem;

	.detail
	{
		display: flex;
		justify-content: flex-end;
		padding-right: 4.25rem;

		color: ${p => p.theme.primary};
	}

	main
	{
		margin-top: -3px;
		background-color: ${p => p.theme.primary};

		height: 25rem;
		border-radius: 0.5rem;
	}
`

export const modalStyle: Modal.Styles =
{
	overlay:
	{
		zIndex: 1,
		width: 'fit-content',
		height: 'fit-content'
	},
	content:
	{
		background: 'none',
		border: 'none',
		padding: 0,
		width: 'fit-content',
		height: 'fit-content',
		left: 'calc(100vw - 20rem - 2rem)',
		top: '4.5rem'
	}
}

export default Container