import * as React from 'react';
import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import { Camera, XCircle } from 'react-feather';
import Modal from '../common/Modal';
import Button from '../common/Button';

interface CameraAppProps {
	open: boolean;
	onClose: () => void;
}
function CameraApp({ open, onClose }: CameraAppProps) {
	const theme = useTheme();
	const webcamRef = React.useRef(null);
	const photoRef = React.useRef(null);

	React.useEffect(() => {
		if (open) {
			getVideo();
		}
	}, [webcamRef, open]);

	const paintToCanvas = () => {
		const video = webcamRef.current;
		const photo = photoRef.current;
		const ctx = photo.getContext('2d');

		const width = 320;
		const height = 240;
		photo.width = width;
		photo.height = height;

		return setInterval(() => {
			ctx.filter = 'contrast(1.4) sepia(1)';
			ctx.drawImage(video, 0, 0, width, height);
		}, 50);
	};

	const getVideo = () => {
		navigator.mediaDevices
			.getUserMedia({ video: { facingMode: 'environment' }, audio: false })
			.then((stream) => {
				const video = webcamRef.current;
				video.srcObject = stream;
				video.play();
			})
			.catch((err) => {
				console.error('Webcam error:', err);
			});
	};

	const takePhoto = () => {
		const photo = photoRef.current;
		const data = photo.toDataURL('image/jpeg');
		const currentImages = localStorage.getItem('Camera Images');
		const id = Math.floor(1000 + Math.random() * 9000);

		if (!currentImages) {
			localStorage.setItem(
				'Camera Images',
				JSON.stringify([
					{
						id,
						title: `Camera Screenshot ${id}`,
						thumbnailUrl: data,
						webcam: true,
					},
				])
			);
		} else {
			localStorage.setItem(
				'Camera Images',
				JSON.stringify([
					...JSON.parse(currentImages),
					{
						id,
						title: `Camera Screenshot ${id}`,
						thumbnailUrl: data,
						webcam: true,
					},
				])
			);
		}
		alert('Picture taken');
	};

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
							onClick={() => {
								navigator.mediaDevices
									.getUserMedia({ video: { facingMode: 'environment' } })
									.then((stream) => {
										stream.getTracks().forEach((track) => track.stop());
										webcamRef.current.srcObject = null;
										onClose();
									});
							}}
							style={{ cursor: 'pointer' }}
						/>
					</div>
				</Header>
				<Content>
					<video
						ref={webcamRef}
						onCanPlay={() => paintToCanvas()}
						style={{ display: 'none' }}
					/>
					<Canvas ref={photoRef} />
					<Button
						text="Take Photo"
						onClick={() => takePhoto()}
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

const Canvas = styled.canvas({
	margin: 10,
	borderRadius: 8,
	width: 500,
});

export default CameraApp;
