import * as React from 'react';
import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import { Camera, XCircle } from 'react-feather';
import Webcam from 'react-webcam';
import Modal from '../common/Modal';
import Button from '../common/Button';

interface CameraAppProps {
	open: boolean;
	onClose: () => void;
}
function CameraApp({ open, onClose }: CameraAppProps) {
	const theme = useTheme();
	const webcamRef = React.useRef(null);
	const capture = React.useCallback(() => {
		const imageSrc = webcamRef.current.getScreenshot();
		const currentImages = localStorage.getItem('Camera Images');
		const id = Math.floor(1000 + Math.random() * 9000);

		if (!currentImages) {
			localStorage.setItem(
				'Camera Images',
				JSON.stringify([
					{ id, title: `Camera Screenshot ${id}`, thumbnailUrl: imageSrc },
				])
			);
		} else {
			localStorage.setItem(
				'Camera Images',
				JSON.stringify([
					...JSON.parse(currentImages),
					{ id, title: `Camera Screenshot ${id}`, thumbnailUrl: imageSrc },
				])
			);
		}
		alert('Picture taken');
	}, [webcamRef]);

	return (
		<Modal open={open}>
			<div>
				<Header>
					<Title>
						<Camera color={theme.color} />
						<h1>Camera</h1>
					</Title>
					<div>
						<XCircle
							color={theme.color}
							onClick={onClose}
							style={{ cursor: 'pointer' }}
						/>
					</div>
				</Header>
				<Content>
					<Webcam
						ref={webcamRef}
						style={{
							width: '100%',
							height: '100%',
							margin: 10,
							borderRadius: 8,
						}}
						audio={false}
						screenshotFormat="image/jpeg"
						videoConstraints={{
							width: 1280,
							height: 720,
							facingMode: 'user',
						}}
					/>
					<Button
						text="Take Photo"
						onClick={capture}
						backgroundColor={theme.primary}
					/>
				</Content>
			</div>
		</Modal>
	);
}

const Header = styled.div(({ theme }) => ({
	color: theme.color,
	width: '100%',
	fontSize: 24,
	fontWeight: 'bold',
	marginBottom: 20,

	display: 'flex',
	alignItems: 'center',
	justifyContent: 'space-between',
	gap: 10,
}));

const Title = styled.div({
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'space-between',
	gap: 10,
});

const Content = styled.div({
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	justifyContent: 'center',
	height: 'calc(100% - 64px)',
});

export default CameraApp;
