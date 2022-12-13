import * as React from 'react';
import styled from '@emotion/styled';
import {
	Folder,
	Chrome,
	Rss,
	Camera,
	Image,
	Aperture,
	Search,
	Bell,
	Wifi,
	Battery,
	Moon,
} from 'react-feather';
import { useTheme } from '@emotion/react';

interface ToolbarProps {
	modals: any;
	switchTheme: () => void;
}

const MODAL_NAMES_MAP = {
	fileDirectoryModal: 'File Directory',
	rssReaderModal: 'RSS Reader',
	cameraModal: 'Camera',
	galleryModal: 'Gallery',
	browserModal: 'Browser',
};
function Toolbar({ modals, switchTheme }: ToolbarProps) {
	const [date, setDate] = React.useState(new Date());
	const [openedModal, setOpenedModal] = React.useState(null);
	const theme = useTheme();

	React.useEffect(() => {
		const timerId = setInterval(refreshClock, 1000);
		return () => clearInterval(timerId);
	}, []);

	React.useEffect(() => {
		for (const [key, value] of Object.entries(modals)) {
			if (value) setOpenedModal(MODAL_NAMES_MAP[key]);
		}
		if (Object.values(modals).every((value) => !value)) setOpenedModal(null);
	}, [modals]);

	const refreshClock = () => {
		setDate(new Date());
	};

	return (
		<Wrapper>
			<div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
				<Aperture color={theme.color} />
				<Search color={theme.color} />
				{openedModal && (
					<Opened>
						{(() => {
							switch (openedModal) {
								case 'File Directory':
									return <Folder color={theme.color} />;
								case 'RSS Reader':
									return <Rss color={theme.color} />;
								case 'Camera':
									return <Camera color={theme.color} />;
								case 'Gallery':
									return <Image color={theme.color} />;
								case 'Browser':
									return <Chrome color={theme.color} />;
							}
						})()}
						{openedModal}
					</Opened>
				)}
			</div>
			<RightSideWrapper>
				<div onClick={switchTheme}>
					<Moon color={theme.color} style={{ cursor: 'pointer' }} />
				</div>
				<div>
					<Bell color={theme.color} style={{ cursor: 'pointer' }} />
				</div>
				<div>
					<Wifi color={theme.color} style={{ cursor: 'pointer' }} />
				</div>
				<div>
					<Battery color={theme.color} style={{ cursor: 'pointer' }} />
				</div>
				<p style={{ fontFamily: 'Roboto, sans-serif' }}>
					{date.toLocaleTimeString()}
				</p>
			</RightSideWrapper>
		</Wrapper>
	);
}

const Wrapper = styled.div(({ theme }) => ({
	backgroundColor: theme.backgroundColor,
	color: theme.color,
	maxWidth: '100%',
	height: '5vh',

	display: 'flex',
	alignItems: 'center',
	justifyContent: 'space-between',
	padding: '0 20px',
}));

const Opened = styled.div({
	width: 150,
	border: '1px solid white',
	borderRadius: 8,
	padding: 10,

	display: 'flex',
	alignItems: 'center',
	gap: 10,
});

const RightSideWrapper = styled.div({
	display: 'flex',
	alignItems: 'center',
	gap: 10,
});

export default Toolbar;
