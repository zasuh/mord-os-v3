import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import Toolbar from '../common/toolbar';
import FileDirectory from '../applications/file-directory';
import {
	background,
	iconFolder,
	iconChrome,
	iconRss,
	iconCamera,
	iconImage,
} from '../../assets/icons';

function Home() {
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
						<img src={iconFolder} width={'50'} />
						<IconTitle>File Directory</IconTitle>
					</Icon>
					<Icon onClick={() => setRssReaderModal(true)}>
						<img src={iconRss} width={'50'} />
						<IconTitle>RSS Reader</IconTitle>
					</Icon>
					<Icon onClick={() => setCameraModal(true)}>
						<img src={iconCamera} width={'50'} />
						<IconTitle>Camera</IconTitle>
					</Icon>
					<Icon onClick={() => setGalleryModal(true)}>
						<img src={iconImage} width={'50'} />
						<IconTitle>Gallery</IconTitle>
					</Icon>
					<Icon onClick={() => setBrowserModal(true)}>
						<img src={iconChrome} width={'50'} />
						<IconTitle>Chrome</IconTitle>
					</Icon>
				</IconsWrapper>
			</Desktop>
			<Toolbar modals={{}} />
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

const Desktop = styled.div({
	fontFamily: 'Roboto, sans-serif',
	backgroundImage: `url(${background})`,
	backgroundRepeat: 'no-repeat',
	maxWidth: '100%',
	height: '95vh',

	display: 'flex',
	alignItems: 'center',
	justifyContent: 'flex-start',
});

const IconsWrapper = styled.div({
	color: 'white',
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

const IconTitle = styled.div({
	marginTop: 5,
	textShadow: 'black 1px 0 10px',
});

export default Home;
