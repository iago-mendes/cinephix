import styled from 'styled-components'

const Container = styled.div`
	position: fixed;
	z-index: 1;

	top: 0;
	right: 0;
	bottom: 0;
	left: 0;

	width: 100vw;
	height: 100vh;
	overflow: hidden;

	display: flex;
	align-items: center;
	justify-content: center;

	background-color: rgba(0, 0, 0, 0.1);
	backdrop-filter: blur(3px);

	.modal-content {
		width: 95vw;
		height: 80vh;
		margin-bottom: 5rem;

		overflow: hidden;
		background-color: ${p => p.theme.background};
		border-top-left-radius: 0.5rem;
		border-top-right-radius: 0.5rem;

		header {
			display: flex;
			align-items: center;
			justify-content: space-between;

			height: 5rem;
			padding: 0.5rem;
			padding-left: 2rem;
			padding-right: 2rem;

			background-color: ${p => p.theme.secondary};

			button,
			a {
				width: 3.5rem;
				height: 3.5rem;
				border-radius: 100rem;

				background: none;
				border: none;
				color: ${p => p.theme.primary};

				display: flex;
				align-items: center;
				justify-content: center;

				cursor: pointer;
				transition: 0.25s;

				:hover {
					background-color: ${p => p.theme.primary};
					color: ${p => p.theme.secondary};
				}
			}
		}

		.modal-scrollable-content {
			width: 100%;
			height: calc(80vh - 5rem);

			overflow-y: auto;
		}

		@media (min-width: 1001px) {
			width: 75vw;
			height: 75vh;
			margin-bottom: 0;

			.modal-scrollable-content {
				height: calc(75vh - 5rem);

				::-webkit-scrollbar {
					width: 1rem;
				}

				::-webkit-scrollbar-track {
					background-color: ${p => p.theme.primary}26;
				}

				::-webkit-scrollbar-thumb {
					background-color: ${p => p.theme.primary};

					:hover {
						background-color: ${p => p.theme.primary}bf;
					}
				}
			}
		}
	}
`

export default Container
