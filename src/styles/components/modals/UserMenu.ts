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
		border-radius: 0.5rem;

		box-shadow: 0px 5px 5px rgba(0,0,0,0.5);

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
		top: '4.5rem',

		boxShadow: '-2.5px 2.5px 2.5px rgba(0,0,0, 0.9)',
		borderRadius: '0.5rem'
	}
}

export default Container