import '@emotion/react';

declare module '*.svg';
declare module '*.png';
declare module '*.jpeg';
declare module '*.jpg';

declare module '@emotion/react' {
	export interface Theme {
		color: string;
		backgroundColor: string;
		backgroundColorSecondary: string;
		background: string;
		backgroundImage: string;
		primary: string;
		secondary: string;
		accent: string;
	}
}
