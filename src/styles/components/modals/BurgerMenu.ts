import styled from 'styled-components'
import Modal from 'react-modal'

const Container = styled.div`
	width: 75vw;
	height: 100vh;

	header
	{
		height: 5rem;

		padding: 0.5rem;
		padding-left: 2rem;
		padding-right: 2rem;

		display: flex;
		align-items: center;

		.close
		{
			border: none;
			background-color: ${p => p.theme.secondary};

			border-radius: 100rem;

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

	nav
	{
		height: calc(100vh - 5rem);
		background-color: ${p => p.theme.secondary};
		box-shadow: 5px 5px 5px rgba(0,0,0,0.5);

		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		gap: 5rem;

		a
		{
			font-family: Ubuntu;
			font-size: 2.5rem;
			font-weight: 700;

			text-decoration: none;
			color: ${p => p.theme.primary};

			width: fit-content;
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
		paddingRight: '2rem',
		width: 'fit-content',
		height: 'fit-content',
		left: 0,
		top: 0
	}
}

export default Container