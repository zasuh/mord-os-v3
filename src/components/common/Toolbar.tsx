import * as React from 'react';
import styled from '@emotion/styled';

import {
	iconFolder,
	iconChrome,
	iconRss,
	iconCamera,
	iconImage,
	iconAperture,
	iconSearch,
	iconBell,
	iconWifi,
	iconBattery,
} from '../../assets/icons';

interface ToolbarProps {
	modals: any;
}

const MODAL_NAMES_MAP = {
	fileDirectoryModal: 'File Directory',
	rssReaderModal: 'RSS Reader',
	cameraModal: 'Camera',
	galleryModal: 'Gallery',
	browserModal: 'Browser',
};
function Toolbar({ modals }: ToolbarProps) {
	const [date, setDate] = React.useState(new Date());
	const [openedModal, setOpenedModal] = React.useState(null);

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
				<img src={iconAperture} />
				<img src={iconSearch} />
				{openedModal && (
					<Opened>
						{(() => {
							switch (openedModal) {
								case 'File Directory':
									return <img src={iconFolder} />;
								case 'RSS Reader':
									return <img src={iconRss} />;
								case 'Camera':
									return <img src={iconCamera} />;
								case 'Gallery':
									return <img src={iconImage} />;
								case 'Browser':
									return <img src={iconChrome} />;
							}
						})()}
						{openedModal}
					</Opened>
				)}
			</div>
			<RightSideWrapper>
				<div>
					<img src={iconBell} />
				</div>
				<div>
					<img src={iconWifi} />
				</div>
				<div>
					<img src={iconBattery} />
				</div>
				<p style={{ fontFamily: 'Roboto, sans-serif' }}>
					{date.toLocaleTimeString()}
				</p>
			</RightSideWrapper>
		</Wrapper>
	);
}

const Wrapper = styled.div({
	fontFamily: 'Roboto, sans-serif',
	backgroundColor: '#171614',
	color: 'white',
	maxWidth: '100%',
	height: '5vh',

	display: 'flex',
	alignItems: 'center',
	justifyContent: 'space-between',
	padding: '0 20px',
});

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
