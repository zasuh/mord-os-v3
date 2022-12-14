import * as React from 'react';
import axios from 'axios';
import styled from '@emotion/styled';
import { useTheme } from '@emotion/react';
import { ChevronRight, Image, XCircle } from 'react-feather';
import Modal from '../common/Modal';

interface GalleryProps {
	open: boolean;
	onClose: () => void;
}
function Gallery({ open, onClose }: GalleryProps) {
	const [photos, setPhotos] = React.useState([]);
	const [selected, setSelected] = React.useState('allImages');
	const theme = useTheme();

	React.useEffect(() => {
		if (open) {
			(async () => {
				try {
					const { data } = await axios.get(
						'https://jsonplaceholder.typicode.com/photos'
					);
					setPhotos(data.slice(0, 30));
				} catch (err) {
					console.log(err);
				}
			})();
		}
	}, [open]);

	return (
		<Modal open={open}>
			<div>
				<Header>
					<Title>
						<Image />
						<h1>Gallery</h1>
					</Title>
					<div>
						<XCircle onClick={() => onClose()} style={{ cursor: 'pointer' }} />
					</div>
				</Header>
				<Content>
					<Sidebar>
						<Sources>
							<SidebarItem onClick={() => setSelected('allImages')}>
								<div>
									<ChevronRight color={theme.color} />
								</div>
								<SidebarItemTitle selected={selected === 'allImages'}>
									All Images
								</SidebarItemTitle>
							</SidebarItem>
							<SidebarItem onClick={() => setSelected('jsonPlaceholder')}>
								<div>
									<ChevronRight color={theme.color} />
								</div>
								<SidebarItemTitle selected={selected === 'jsonPlaceholder'}>
									JSON Placeholder Images
								</SidebarItemTitle>
							</SidebarItem>
							<SidebarItem onClick={() => setSelected('webcam')}>
								<div>
									<ChevronRight color={theme.color} />
								</div>
								<SidebarItemTitle selected={selected === 'webcam'}>
									Webcam Images
								</SidebarItemTitle>
							</SidebarItem>
						</Sources>
					</Sidebar>
					<Images>
						{(() => {
							let initialPhotos = [];
							const webcamImages = localStorage.getItem('Camera Images');

							if (selected === 'allImages')
								initialPhotos = [
									...(webcamImages ? JSON.parse(webcamImages) : []),
									...photos,
								];
							if (selected === 'webcam' && webcamImages)
								initialPhotos = [...JSON.parse(webcamImages)];
							if (selected === 'jsonPlaceholder') initialPhotos = photos;

							return (
								<>
									{initialPhotos.length > 0 ? (
										initialPhotos.map((photo) => (
											<div
												key={photo.id}
												style={{ width: 150, position: 'relative' }}
											>
												<ImageWrapper>
													<Picture src={photo.thumbnailUrl} alt="" />
												</ImageWrapper>
												<ImageTitle>{photo.title}</ImageTitle>
											</div>
										))
									) : (
										<EmptyState>
											<p>
												Nothing to show. Take a picture through the Camera App!
											</p>
										</EmptyState>
									)}
								</>
							);
						})()}
					</Images>
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

const Content = styled.div(({ theme }) => ({
	color: theme.color,
	display: 'flex',
	alignItems: 'flex-start',
	height: '100%',
	minHeight: 600,
	maxHeight: 600,
	overflowY: 'scroll',
}));

const Sidebar = styled.div({
	position: 'sticky',
	top: 0,
	height: '100%',
	width: '33%',
	padding: 10,
});

const SidebarItem = styled.div({
	display: 'flex',
	alignItems: 'center',
	gap: 5,
	cursor: 'pointer',
});

const SidebarItemTitle = styled.p(({ selected }: { selected: boolean }) => ({
	fontSize: 14,
	fontWeight: selected ? 'bold' : 'initial',
}));

const Sources = styled.div({
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'flex-start',
	gap: 10,
});

const Images = styled.div({
	maxHeight: '100%',
	flex: '0 1 calc(66% + 20px)',
	flexWrap: 'wrap',
	paddingTop: 10,
	margin: '0 15px',
	overflow: 'auto',

	display: 'flex',
	alignItems: 'flex-start',
	justifyContent: 'center',
	gap: 20,
});

const ImageWrapper = styled.div({
	width: 150,
	height: 150,
	overflow: 'hidden',
	borderRadius: 8,
	boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
});

const ImageTitle = styled.div({
	fontWeight: 'bold',
	marginTop: 10,
	width: 150,
	height: 20,
	overflow: 'hidden',
	whiteSpace: 'nowrap',
	textOverflow: 'ellipsis',
});

const Picture = styled.img({
	flexBasis: '40%',
	flexGrow: 1,
	width: 150,
	height: 150,
	objectFit: 'contain',
});

const EmptyState = styled.div({
	height: 600,
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
});

export default Gallery;
