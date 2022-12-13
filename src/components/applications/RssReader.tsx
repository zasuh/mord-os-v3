import * as React from 'react';
import styled from '@emotion/styled';
import axios from 'axios';
import Modal from '../common/Modal';
import { ChevronRight, Rss, XCircle } from 'react-feather';
import { useTheme } from '@emotion/react';

interface RssReaderProps {
	open: boolean;
	onClose: () => void;
}

const MOCKED_POSTS = [
	{
		id: 112443,
		name: 'Mocked post 1',
		email: 'email@email.com',
		body: 'Lorem ipsum',
	},
	{
		id: 2123143,
		name: 'Mocked post 2',
		email: 'email2@email.com',
		body: 'Lorem ipsum',
	},
	{
		id: 37457657,
		name: 'Mocked post 3',
		email: 'email3@email.com',
		body: 'Lorem ipsum',
	},
	{
		id: 41232145,
		name: 'Mocked post 4',
		email: 'email4@email.com',
		body: 'Lorem ipsum',
	},
	{
		id: 58768768,
		name: 'Mocked post 5',
		email: 'email5@email.com',
		body: 'Lorem ipsum',
	},
];
function RssReader({ open, onClose }: RssReaderProps) {
	const [posts, setPosts] = React.useState([]);
	const [selected, setSelected] = React.useState('allPosts');
	const theme = useTheme();

	React.useEffect(() => {
		if (open) {
			(async () => {
				try {
					const { data } = await axios.get(
						'https://jsonplaceholder.typicode.com/comments'
					);
					setPosts(data.slice(0, 50));
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
						<Rss />
						<h1>RSS Reader</h1>
					</Title>
					<div>
						<XCircle onClick={onClose} style={{ cursor: 'pointer' }} />
					</div>
				</Header>
				<Content>
					<Sidebar>
						<Sources>
							<SidebarItem onClick={() => setSelected('allPosts')}>
								<div>
									<ChevronRight color={theme.color} />
								</div>
								<SidebarItemTitle selected={selected === 'allPosts'}>
									All Posts
								</SidebarItemTitle>
							</SidebarItem>
							<SidebarItem onClick={() => setSelected('jsonPlaceholder')}>
								<div>
									<ChevronRight color={theme.color} />
								</div>
								<SidebarItemTitle selected={selected === 'jsonPlaceholder'}>
									JSON Placeholder Posts
								</SidebarItemTitle>
							</SidebarItem>
							<SidebarItem onClick={() => setSelected('mocked')}>
								<div>
									<ChevronRight color={theme.color} />
								</div>
								<SidebarItemTitle selected={selected === 'mocked'}>
									Mocked Posts
								</SidebarItemTitle>
							</SidebarItem>
						</Sources>
					</Sidebar>
					<Posts>
						{(() => {
							let initialPosts = [];
							if (selected === 'allPosts')
								initialPosts = [...MOCKED_POSTS, ...posts];
							if (selected === 'mocked') initialPosts = [...MOCKED_POSTS];
							if (selected === 'jsonPlaceholder') initialPosts = posts;

							return (
								<>
									{initialPosts.length > 0 ? (
										initialPosts.map((post) => (
											<Post key={post.id}>
												<h3 style={{ fontWeight: 'bold' }}>{post.name}</h3>
												<p style={{ color: theme.accent }}>
													Written by: {post.email}
												</p>
												<p>{post.body}</p>
											</Post>
										))
									) : (
										<EmptyState>
											<p>Nothing to show</p>
										</EmptyState>
									)}
								</>
							);
						})()}
					</Posts>
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
	width: '25%',
	padding: 10,
});

const Sources = styled.div({
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'flex-start',
	gap: 10,
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

const Posts = styled.div({
	height: '100%',
	flex: '0 1 calc(75% + 20px)',
	marginLeft: 15,
	overflow: 'auto',

	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
});

const Post = styled.div(({ theme }) => ({
	width: 'calc(100% - 40px)',
	boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
	backgroundColor: theme.backgroundColorSecondary,
	margin: '0 10px 10px 10px',
	borderRadius: 8,
	padding: 10,

	display: 'flex',
	flexDirection: 'column',
	alignItems: 'flex-start',
	gap: 10,
}));

const EmptyState = styled.div({
	height: 600,
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
});

export default RssReader;
