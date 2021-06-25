import styled, { withTheme } from 'styled-components';

const Text = styled.p`
	font-family: ${({ theme, weight = 'sansSerif' }) => theme.typography[weight]};
	color: ${({ theme, color = 'letterColor1' }) => theme.colors[color]};
	text-transform: ${({ uppercase }) => (uppercase ? 'uppercase' : 'none')};
	font-size: ${({ theme, size = 's' }) => theme.typographySizes[size].size};
	line-height: ${({ theme, line = 's' }) => theme.typographySizes[line].line};
	margin: ${({ margin }) => margin};
`;

export default withTheme(Text);
