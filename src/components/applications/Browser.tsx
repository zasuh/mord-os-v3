import * as React from 'react';
import styled from '@emotion/styled';
import { useTheme } from '@emotion/react';
import { Chrome, XCircle } from 'react-feather';
import Modal from '../common/Modal';
import Button from '../common/Button';

interface BrowserProps {
	open: boolean;
	onClose: () => void;
}
function Browser({ open, onClose }: BrowserProps) {
	const [searchQuery, setSearchQuery] = React.useState(null);
	const theme = useTheme();

	const search = (e) => {
		if (!searchQuery) return;
		e.preventDefault();
		window.open(`http://google.com/search?q=${searchQuery}`);
	};
	return (
		<Modal open={open}>
			<div>
				<Header>
					<Title>
						<Chrome />
						<h1>Browser</h1>
					</Title>
					<div>
						<XCircle onClick={onClose} style={{ cursor: 'pointer' }} />
					</div>
				</Header>
				<Content>
					<BrowserTitle>SCHMOOGLE</BrowserTitle>
					<form onSubmit={search}>
						<FormContent>
							<Input
								placeholder="Search like Google"
								type="text"
								onChange={(e) => setSearchQuery(e.target.value)}
							/>
							<div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
								<Button
									text="Search"
									width={100}
									onClick={search}
									type="submit"
									backgroundColor={theme.primary}
								/>
								<Button
									text="I'm feeling lucky"
									width={150}
									disabled
									backgroundColor="#3A2618"
								/>
							</div>
						</FormContent>
					</form>
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
	flexDirection: 'column',
	alignItems: 'center',
	justifyContent: 'center',
	height: '100%',
	minHeight: 600,
	maxHeight: 600,
}));

const FormContent = styled.div({
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	gap: 10,
});

const BrowserTitle = styled.div({
	fontSize: 48,
	fontWeight: 'bold',
	marginBottom: 16,
});

const Input = styled.input({
	width: 500,
	borderRadius: 12,
	padding: 5,
});

export default Browser;
