import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import Toolbar from '../common/Toolbar';
import FileDirectory from '../applications/FileDirectory';
import {
	iconFolder,
	iconChrome,
	iconRss,
	iconCamera,
	iconImage,
} from '../../assets/icons';

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
						<IconImg src={iconFolder} />
						<IconTitle>File Directory</IconTitle>
					</Icon>
					<Icon onClick={() => setRssReaderModal(true)}>
						<IconImg src={iconRss} />
						<IconTitle>RSS Reader</IconTitle>
					</Icon>
					<Icon onClick={() => setCameraModal(true)}>
						<IconImg src={iconCamera} />
						<IconTitle>Camera</IconTitle>
					</Icon>
					<Icon onClick={() => setGalleryModal(true)}>
						<IconImg src={iconImage} />
						<IconTitle>Gallery</IconTitle>
					</Icon>
					<Icon onClick={() => setBrowserModal(true)}>
						<IconImg src={iconChrome} />
						<IconTitle>Chrome</IconTitle>
					</Icon>
				</IconsWrapper>
			</Desktop>
			<Toolbar modals={{}} switchTheme={switchTheme} />
			{fileDirectoryModal && <FileDirectory open={fileDirectoryModal} />}
			{/*<RssReaderModal
      isOpen={rssReaderModal}
      onClose={() => setRssReaderModal(false)}
    />
    <CameraModal isOpen={cameraModal} onClose={() => setCameraModal(false)} />
    <GalleryModal
      isOpen={galleryModal}
      onClose={() => setGalleryModal(false)}
    />
    <BrowserModal
      isOpen={browserModal}
      onClose={() => setBrowserModal(false)}
    />*/}
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
	height: '60%',
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	justifyContent: 'space-between',
	padding: 10,
	gap: '2em',
});

const Icon = styled.div({
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	cursor: 'pointer',
});

const IconImg = styled.img(({ theme }) => ({
	color: theme.color,
	width: 50,
}));

const IconTitle = styled.div(({ theme }) => ({
	color: theme.color,
	marginTop: 5,
}));

export default Home;
