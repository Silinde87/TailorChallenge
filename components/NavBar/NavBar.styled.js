import styled from 'styled-components';

const SCNavBar = styled.nav`
	height: 50px;
	width: 100%;
	border-bottom: 1px solid black;
	display: flex;
	align-items: center;
	justify-content: space-around;
	position: sticky;
	top: 0;
	background-color: white;

	button {
		margin: 0px 3px;
	}
	.restButtonsBox {
		width: 50%;
		display: flex;
		justify-content: flex-start;
		margin-left: 15px;
	}
	.logButtonsBox {
		width: 50%;
		display: flex;
		justify-content: flex-end;
		margin-right: 15px;
	}
	p {
		display: none;
		margin: auto;
		margin-left: 0px;
		margin-right: 3px;
	}

	@media (min-width: 768px) {
		p {
			display: block;
		}
	}
`;

export default SCNavBar;
