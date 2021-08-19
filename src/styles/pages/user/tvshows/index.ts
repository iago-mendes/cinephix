import styled from 'styled-components'

const Container = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;

	main {
		height: fit-content;
		min-height: calc(100vh - 5rem);

		width: 100%;
		overflow-x: auto;

		.dragDropArea {
			display: flex;
			gap: 2rem;
			padding: 2rem;
			padding-bottom: 1rem;

			width: fit-content;

			.statusColumn {
				background-color: ${p => p.theme.black};
				height: fit-content;

				padding-top: 1rem;
				border-top-right-radius: 0.5rem;
				border-top-left-radius: 0.5rem;

				display: flex;
				flex-direction: column;

				header {
					width: 100%;

					::after {
						content: '';
						width: 100%;
						height: 1px;
						display: block;

						margin-top: 1rem;

						background: ${p => p.theme.primary}40;
					}

					.group {
						display: flex;
						align-items: center;
						justify-content: space-between;

						padding-left: 1rem;
						padding-right: 1rem;

						h1 {
							font-family: Roboto;
							font-weight: 700;
							font-size: 2.25rem;

							color: ${p => p.theme.primary};
						}

						.buttons {
							display: flex;
							gap: 1rem;

							button {
								background: none;
								border: none;
								border-radius: 100rem;

								width: 2.5rem;
								height: 2.5rem;

								display: flex;
								align-items: center;
								justify-content: center;

								color: ${p => p.theme.primary}80;
								cursor: pointer;
								transition: 0.25s;

								:hover {
									color: ${p => p.theme.primary};
									background-color: ${p => p.theme.gray}40;
								}
							}
						}
					}
				}

				.droppableArea {
					height: fit-content;
					min-height: 10rem;
					background-color: ${p => p.theme.background}40;

					display: flex;
					flex-direction: column;

					padding: 1rem;
					width: 32rem;

					> div {
						margin-bottom: 1rem;
					}
				}

				.add {
					width: 100%;
					padding: 1rem;
					background-color: ${p => p.theme.background}40;
					border: none;

					display: flex;
					align-items: center;
					justify-content: center;
					gap: 1rem;

					color: #4d4d5a;

					cursor: pointer;
					transition: 0.25s;

					:hover {
						background: none;
						color: ${p => p.theme.primary}80;
					}

					span {
						font-family: Ubuntu;
						font-weight: 700;
						font-size: 1.5rem;
					}
				}
			}
		}
	}

	@media (max-width: 600px) {
		main .dragDropArea .statusColumn {
			header .group {
				h1 {
					font-size: 1.75rem;
				}

				.buttons {
					gap: 0;

					button {
						width: 2.25rem;
						height: 2.25rem;
					}
				}
			}

			.droppableArea {
				width: 22rem;
			}
		}
	}
`

export default Container
