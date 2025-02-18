import React from 'react';
import { ThemeProvider } from 'styled-components';
import { theme } from './../styles/theme';
import { render } from '@testing-library/react';

const RenderWithProviders = ({ children }) => {
	return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

const customRender = (ui, options) => render(ui, { wrapper: RenderWithProviders, ...options });

export * from '@testing-library/react';

export { customRender as render };
