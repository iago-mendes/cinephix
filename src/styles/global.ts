import {createGlobalStyle} from 'styled-components'
import Modal from 'react-modal'
import {StylesConfig} from 'react-select'

export default createGlobalStyle`
	:root
	{
		font-size: 10px;
	}

	*
	{
		margin: 0;
		padding: 0;
		box-sizing: border-box;
		outline: none;
		-webkit-tap-highlight-color: transparent;
	}

	body
	{
		background-color: ${p => p.theme.background};

		overscroll-behavior: contain;
	}

	body.avoid-scroll {
		height: 100vh;
		overflow-y: hidden;
	}

	body, input, textarea, button
	{
		font-family: Roboto;
	}
	
	button
	{
		cursor: pointer;
	}
	
	a
	{
		color: inherit;
		text-decoration: none;
	}

	img {
		max-width: 100%;
		max-height: 100%;
	}

	.page
	{
		min-height: calc(100vh - 5rem);
	}

	.swal2-popup
	{
		background-color: ${p => p.theme.black} !important;
		color: ${p => p.theme.primary} !important;

		#swal2-title
		{
			font-family: Ubuntu;
			font-size: 25px;
			color: ${p => p.theme.gray};
		}

		#swal2-content
		{
			font-family: Roboto;
			font-size: 20px !important;
			color: ${p => p.theme.gray};
		}

		.swal2-actions
		{
			font-size: 15px !important;
			font-family: Ubuntu !important;
		}
	}

	@media (min-width: 800px) {
		* {
			::-webkit-scrollbar {
				width: 15px;
				height: 15px;
			}

			::-webkit-scrollbar-track {
				background-color: ${p => p.theme.black};
			}
			
			::-webkit-scrollbar-thumb {
				background-color: rgba(255, 255, 255, 0.2);
				border-radius: 0.5rem;

				:hover {
					background-color: rgba(255, 255, 255, 0.15);
				}
			}
		}

		body.avoid-scroll {
			padding-right: 15px !important;
		}
	}

	@media (max-width: 799px) {
		body
		{
			-webkit-user-select: none;
			-moz-user-select: -moz-none;
			-ms-user-select: none;
			user-select: none;
		}
	}
`

export const modalStyle: Modal.Styles = {
	overlay: {
		backgroundColor: 'rgba(0, 0, 0, 0.6)',
		zIndex: 2
	},

	content: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		background: 'none',
		border: 'none',
		padding: 0,
		width: '100%',
		height: '100%',
		left: 0,
		top: 0
	}
}

export const selectStyles: StylesConfig<{label: string; value: string}, false> =
	{
		option: (provided, state) => ({
			cursor: 'pointer',

			fontFamily: 'Roboto',
			fontSize: '2rem',
			padding: '1rem',

			transition: '0.1s',
			color: state.isSelected
				? '#23232A'
				: state.isFocused
				? '#FF8A00'
				: '#7B7B7B',
			backgroundColor: state.isSelected ? '#FF8A00' : '#23232A'
		}),

		menu: provided => ({
			...provided,
			fontFamily: 'Roboto',
			backgroundColor: '#23232A'
		}),

		control: (provided, state) => ({
			cursor: 'pointer',

			transition: '0.25s',

			fontFamily: 'Roboto',
			fontSize: '2rem',

			width: '100%',
			backgroundColor: '#23232A',

			borderColor: state.menuIsOpen
				? '#FF8A00'
				: state.isFocused
				? '#FF8A0080'
				: '#7B7B7B',
			borderWidth: 2,
			borderStyle: 'solid',
			borderRadius: 5,

			display: 'flex',
			alignItems: 'center'
		}),

		singleValue: provided => ({
			...provided,

			color: '#FF8A00'
		}),

		indicatorSeparator: (provided, state) => ({
			...provided,

			backgroundColor: state.isFocused ? '#FF8A00' : '#7B7B7B'
		}),

		dropdownIndicator: (provided, state) => ({
			...provided,

			color: state.isFocused ? '#FF8A00' : '#7B7B7B'
		})
	}
