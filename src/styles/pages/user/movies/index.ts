import styled from 'styled-components'

const Container = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;

	main {
		width: 100%;

		height: fit-content;
		min-height: calc(100vh - 5rem);

		display: flex;
		flex-direction: column;
		gap: 2rem;
		padding: 2rem;

		.options {
			display: flex;
			align-items: center;
			justify-content: flex-end;

			.sort {
				display: flex;
				align-items: center;
				gap: 0.5rem;

				span {
					font-family: Roboto;
					font-size: 2rem;
					color: ${p => p.theme.primary};
				}

				.select {
					width: 20rem;
				}
			}
		}

		.watchList,
		.watched {
			width: 100%;

			.grid {
				width: 100%;

				display: grid;
				grid-template-columns: repeat(auto-fill, minmax(30rem, 1fr));
				grid-gap: 2rem;
				align-items: center;
				justify-items: center;

				.add {
					display: flex;
					align-items: center;
					justify-content: center;

					border: none;
					background: none;
					color: ${p => p.theme.primary};
					border: ${p => p.theme.primary} 2px solid;

					width: 4rem;
					height: 4rem;
					border-radius: 100rem;

					cursor: pointer;
					transition: 0.25s;

					:hover {
						color: ${p => p.theme.background};
						background-color: ${p => p.theme.primary};

						transform: scale(1.5);
					}
				}
			}
		}

		.watchList {
			background-color: ${p => p.theme.black}40;
			padding: 1rem;
			border-radius: 1rem;

			display: flex;
			flex-direction: column;
			gap: 1.5rem;
		}
	}
`

interface DropdownProps {
	showWatchList: boolean
}

export const Dropdown = styled.div<DropdownProps>`
	width: fit-content;

	display: flex;
	align-items: center;
	gap: 1rem;

	color: ${p => p.theme.primary};

	cursor: pointer;
	transition: 0.25s;

	:hover {
		transform: scale(1.05);
	}

	span {
		font-family: Roboto;
		font-weight: 700;
		font-size: 2.5rem;
	}

	svg {
		transition: 0.25s;
		transform: ${p => (p.showWatchList ? 'rotate(180deg)' : 'rotate(90deg)')};
	}
`

export default Container
