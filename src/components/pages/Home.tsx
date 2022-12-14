import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { useTheme } from '@emotion/react';
import { Folder, Rss, Camera, Image, Chrome } from 'react-feather';

import Toolbar from '../common/Toolbar';
import FileDirectory from '../applications/FileDirectory';
import RssReader from '../applications/RssReader';
import CameraApp from '../applications/CameraApp';
import Gallery from '../applications/Gallery';
import Browser from '../applications/Browser';

interface HomeProps {
	switchTheme: () => void;
}

function Home({ switchTheme }: HomeProps) {
	const [fileDirectoryModal, setFileDirectoryModal] = React.useState(false);
	const [rssReaderModal, setRssReaderModal] = React.useState(false);
	const [cameraModal, setCameraModal] = React.useState(false);
	const [galleryModal, setGalleryModal] = React.useState(false);
	const [browserModal, setBrowserModal] = React.useState(false);
	const navigate = useNavigate();
	const theme = useTheme();

	React.useEffect(() => {
		const authToken = localStorage.getItem('Email');
		if (authToken) navigate('/');
		else navigate('/login');
	}, [navigate]);

	return (
		<>
			<Desktop>
				<IconsWrapper>
					<Icon onClick={() => setFileDirectoryModal(true)}>
						<Folder size={40} color={theme.color} />
						<IconTitle>File Directory</IconTitle>
					</Icon>
					<Icon onClick={() => setRssReaderModal(true)}>
						<Rss size={40} color={theme.color} />
						<IconTitle>RSS Reader</IconTitle>
					</Icon>
					<Icon onClick={() => setCameraModal(true)}>
						<Camera size={40} color={theme.color} />
						<IconTitle>Camera</IconTitle>
					</Icon>
					<Icon onClick={() => setGalleryModal(true)}>
						<Image size={40} color={theme.color} />
						<IconTitle>Gallery</IconTitle>
					</Icon>
					<Icon onClick={() => setBrowserModal(true)}>
						<Chrome size={40} color={theme.color} />
						<IconTitle>Chrome</IconTitle>
					</Icon>
				</IconsWrapper>
			</Desktop>
			<Toolbar modals={{}} switchTheme={switchTheme} />

			<FileDirectory
				open={fileDirectoryModal}
				onClose={() => setFileDirectoryModal(false)}
			/>
			<RssReader
				open={rssReaderModal}
				onClose={() => setRssReaderModal(false)}
			/>
			<CameraApp open={cameraModal} onClose={() => setCameraModal(false)} />
			<Gallery open={galleryModal} onClose={() => setGalleryModal(false)} />
			<Browser open={browserModal} onClose={() => setBrowserModal(false)} />
		</>
	);
}

const Desktop = styled.div(({ theme }) => ({
	backgroundImage: theme.backgroundImage,
	backgroundRepeat: 'no-repeat',
	maxWidth: '100%',
	height: '95vh',

	display: 'flex',
	alignItems: 'center',
	justifyContent: 'flex-start',
}));

const IconsWrapper = styled.div({
	height: 450,
	display: 'flex',
	flexDirection: 'column',
	alignSelf: 'flex-start',
	alignItems: 'center',
	justifyContent: 'space-between',
	padding: 10,
	gap: 5,
});

const Icon = styled.div({
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	cursor: 'pointer',
});

const IconTitle = styled.div(({ theme }) => ({
	color: theme.color,
	marginTop: 5,
}));

export default Home;
