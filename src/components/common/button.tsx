import * as React from 'react';
import styled from '@emotion/styled';

interface ButtonProps {
	text: string;
	backgroundColor?: string;
	width?: number;
	children?: any;
	onClick?: () => void;
	disabled?: boolean;
	type?: 'button' | 'submit' | 'reset';
}
const Button = ({
	text = '',
	backgroundColor = '#37423D',
	width = 100,
	children = null,
	onClick,
	type,
	disabled = false,
}: ButtonProps) => {
	return (
		<Wrapper
			hasChildren={children && children[0]}
			onClick={onClick}
			backgroundColor={backgroundColor}
			width={width}
			type={type}
			disabled={disabled}
		>
			{children}
			{text}
		</Wrapper>
	);
};

const Wrapper = styled.button(
	({
		backgroundColor,
		width,
		hasChildren,
	}: {
		backgroundColor: string;
		width: number;
		hasChildren: boolean;
	}) => ({
		...(hasChildren && {
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'space-between',
			gap: 5,
		}),
		fontFamily: 'Roboto, sans-serif',
		color: 'white',
		padding: 10,
		backgroundColor,
		border: 'none',
		borderRadius: 8,
		width,
		cursor: 'pointer',
		':disabled': {
			backgroundColor: 'grey',
			cursor: 'not-allowed',
		},
	})
);

export default Button;
