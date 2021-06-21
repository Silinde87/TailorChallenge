import styled from 'styled-components';

const SCNavBar = styled.nav`
	height: 50px;
	width: 100%;
	border-bottom: 1px solid black;
	color: ${({ theme }) => theme.colors.primary}; ;
`;

export default SCNavBar;
