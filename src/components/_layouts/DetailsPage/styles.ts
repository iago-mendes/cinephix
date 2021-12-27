import styled from 'styled-components'

export const Container = styled.div<{overviewLength: number}>`
	> main {
		height: calc(100vh - 5rem);
		padding: 2rem;

		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 2rem;

		> figure {
			width: calc((100vh - 5rem - 4rem) / 1.5);
			max-width: calc(50% - 5rem);

			border-radius: 0.5rem;
		}

		> .info {
			height: 100%;
			width: 50%;
			margin-right: 5rem;

			display: flex;
			flex-direction: column;
			justify-content: space-around;
			gap: 2rem;

			color: ${p => p.theme.primary};

			> h1.title {
				font-family: Ubuntu;
				font-weight: 700;
				font-size: 4rem;
			}

			> .details {
				display: flex;
				flex-direction: column;
				gap: 2rem;

				padding-left: 5rem;
				padding-right: 5rem;

				svg {
					font-size: 3rem;
				}

				.detail {
					display: flex;
					align-items: center;
					gap: 1rem;

					strong {
						font-family: Ubuntu;
						font-weight: 700;
						font-size: 2rem;
					}

					span {
						font-family: Ubuntu;
						font-weight: 400;
						font-size: 2rem;
					}
				}

				.group {
					display: flex;
					align-items: center;
					justify-content: space-between;

					width: 100%;
				}
			}

			> p.description {
				font-family: Roboto;
				font-size: ${p => (p.overviewLength < 500 ? '2rem' : '1.5rem')};
			}

			> ul.tags {
				width: 100%;

				display: grid;
				grid-auto-rows: 5rem;
				grid-template-columns: repeat(auto-fill, minmax(15rem, 1fr));
				grid-gap: 1rem;
				align-items: center;
				justify-items: center;

				li {
					display: flex;
					align-items: center;
					justify-content: center;

					text-decoration: none;
					white-space: nowrap;

					padding: 0.75rem;
					padding-left: 2rem;
					padding-right: 2rem;

					border: ${p => p.theme.primary} 1px solid;
					border-radius: 100rem;

					font-family: Ubuntu;
					font-weight: 400;
					font-size: 1.75rem;
				}
			}
		}
	}

	> .row {
		display: flex;
		padding: 3rem 0;

		:nth-child(even) {
			background-color: rgba(0, 0, 0, 0.5);
		}
	}

	> .collection {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-around;

		::before,
		::after {
			content: '';
			width: 90%;
			height: 0.5rem;

			background-color: ${p => p.theme.primary}80;
			border-radius: 100rem;

			margin: 1rem;
		}

		> div {
			display: flex;
			align-items: center;
			justify-content: space-around;

			width: 90%;

			h1 {
				font-family: Ubuntu;
				font-weight: 700;
				font-size: 2rem;

				color: ${p => p.theme.primary};
				width: 50%;
			}

			figure {
				width: 15rem;
				border-radius: 1rem;
			}
		}
	}

	> .user {
		align-items: center;
		justify-content: center;
		gap: 15rem;

		padding: 3rem 1rem;

		.add {
			display: flex;
			align-items: center;
			gap: 1rem;

			background: none;
			border: ${p => p.theme.primary} 2px solid;
			border-radius: 100rem;
			padding: 1rem;

			color: ${p => p.theme.primary};
			cursor: pointer;
			transition: 0.25s;

			:hover {
				background-color: ${p => p.theme.primary};
				color: ${p => p.theme.background};

				transform: scale(1.05);
			}

			span {
				font-family: Ubuntu;
				font-weight: 700;
				font-size: 2rem;
			}
		}

		.group {
			display: flex;
			flex-direction: column;

			color: ${p => p.theme.primary};

			label {
				font-family: Roboto;
				font-weight: 700;
				font-size: 3rem;

				padding-left: 1rem;
				border-left: ${p => p.theme.primary} 5px solid;
			}

			span {
				font-family: Roboto;
				font-size: 2rem;

				margin-left: 2rem;

				display: flex;
				align-items: center;
			}
		}

		.edit {
			background: none;
			border: none;
			color: ${p => p.theme.primary};

			width: 4rem;
			height: 4rem;
			border-radius: 100rem;

			display: flex;
			align-items: center;
			justify-content: center;

			cursor: pointer;
			transition: 0.25s;

			:hover {
				background-color: ${p => p.theme.primary};
				color: ${p => p.theme.background};

				transform: scale(1.1);
			}
		}
	}

	> .carousel {
		flex-direction: column;
		gap: 3rem;

		> span {
			font-family: Roboto;
			font-weight: 700;
			font-size: 3rem;
			color: ${p => p.theme.primary};

			margin-left: 1rem;
			padding-left: 1rem;
			border-left: ${p => p.theme.primary} 5px solid;
		}
	}

	@media (min-width: 500px) {
		> .collection {
			::before,
			::after {
				width: 50%;
			}

			> div {
				width: 50%;
			}
		}
	}

	@media (max-width: 1024px) {
		> main {
			height: fit-content;

			flex-direction: column;
			align-items: center;

			> figure {
				width: 75vw;
				max-width: 40rem;
			}

			> .info {
				width: 100%;
				margin: 0;
				margin-top: 2rem;

				h1 {
					font-size: 3rem;
				}

				.details {
					padding: 0;

					.detail span,
					.detail strong {
						font-size: 1.5rem;
					}

					.dates span {
						font-size: 1.4rem;
					}
				}

				ul li {
					padding-left: 1rem;
					padding-right: 1rem;

					font-size: 1.5rem;
				}
			}
		}

		> .user {
			flex-direction: column;
			gap: 2rem;

			.group {
				width: 100%;
			}
		}
	}
`
