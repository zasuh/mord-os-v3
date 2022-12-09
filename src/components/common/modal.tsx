import * as React from 'react';
import styled from '@emotion/styled';
interface ModalProps {
	open: boolean;
	children: React.ReactNode;
}
function Modal({ open, children }: ModalProps) {
	return (
		<Overlay open={open}>
			<Wrapper>{children}</Wrapper>
		</Overlay>
	);
}

const Overlay = styled.div<ModalProps>(({ open }) => ({
	display: open ? 'block' : 'none',
	position: 'fixed',
	zIndex: 1,
	bottom: 0,
	left: 0,
	right: 0,
	top: 0,
	width: '100%',
	height: '100%',
	backgroundColor: 'rgba(0,0,0,0.4)',
}));

const Wrapper = styled.div({
	backgroundColor: 'white',
	margin: '15% auto',
	padding: 20,
	border: '1px solid black',
	width: '80%',
});

export default Modal;
