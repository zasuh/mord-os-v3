import * as React from 'react';
import styled from '@emotion/styled';
import { Folder, XCircle, Plus } from 'react-feather';
import Modal from '../common/Modal';
import Button from '../common/Button';
import Table from '../common/Table';
import { useTheme } from '@emotion/react';

interface FileDirectoryProps {
	open: boolean;
	onClose: () => void;
}

const STARTING_DATA = [
	{
		id: 1,
		title: 'First title',
		body: 'A Some text that will probably be in a body.',
		date: new Date(),
	},
	{
		id: 2,
		title: 'Second title',
		body: 'B Some text that will probably be in a body.',
		date: new Date(),
	},
	{
		id: 3,
		title: 'Third title',
		body: 'C Some text that will probably be in a body.',
		date: new Date(),
	},
	{
		id: 4,
		title: 'Fourth title',
		body: 'D Some text that will probably be in a body.',
		date: new Date(),
	},
	{
		id: 5,
		title: 'Fifth title',
		body: 'E Some text that will probably be in a body.',
		date: new Date(),
	},
];

function FileDirectory({ open, onClose }: FileDirectoryProps) {
	const [files, setFiles] = React.useState(STARTING_DATA);
	const [title, setTitle] = React.useState('');
	const [body, setBody] = React.useState('');
	const [editor, setEditor] = React.useState(false);
	const [rowId, setRowId] = React.useState(null);
	const [sortingColumn, setSortingColumn] = React.useState(null);
	const theme = useTheme();

	const save = (e) => {
		e.preventDefault();

		if (!rowId) {
			const id = Math.floor(1000 + Math.random() * 9000);
			const newFile = { id, title, body, date: new Date() };
			setFiles([newFile, ...files]);
			setRowId(null);
			setTitle('');
			setBody('');
		} else {
			const updatedFiles = files.map((file) =>
				file.id === rowId ? { ...file, title, body, date: new Date() } : file
			);
			setFiles(updatedFiles);
		}
	};

	const remove = (e) => {
		e.preventDefault();

		const updatedFiles = files.filter((file) => file.id !== rowId);
		setEditor(false);
		setFiles(updatedFiles);
		setRowId(null);
		setTitle('');
		setBody('');
	};

	const sortData = (column) => {
		let sortOrder = null;
		if (sortingColumn === column) sortOrder = 'asc';
		else sortOrder = 'desc';

		if (column === 'id') {
			const sorted = files
				.slice()
				.sort((a, b) => (sortOrder === 'asc' ? a.id - b.id : b.id - a.id));
			setSortingColumn(sortOrder === 'desc' ? column : null);
			setFiles(sorted);
		}

		if (column === 'title') {
			const sorted = files
				.slice()
				.sort((a, b) =>
					sortOrder === 'asc'
						? a.title.toLowerCase().localeCompare(b.title.toLowerCase())
						: b.title.toLowerCase().localeCompare(a.title.toLowerCase())
				);
			setSortingColumn(sortOrder === 'desc' ? column : null);
			setFiles(sorted);
		}

		if (column === 'body') {
			const sorted = files
				.slice()
				.sort((a, b) =>
					sortOrder === 'asc'
						? a.body.toLowerCase().localeCompare(b.body.toLowerCase())
						: b.body.toLowerCase().localeCompare(a.body.toLowerCase())
				);
			setSortingColumn(sortOrder === 'desc' ? column : null);
			setFiles(sorted);
		}

		if (column === 'date') {
			const sorted = files
				.slice()
				.sort((a, b) =>
					sortOrder === 'asc'
						? new Date(a.date).valueOf() - new Date(b.date).valueOf()
						: new Date(b.date).valueOf() - new Date(a.date).valueOf()
				);
			setSortingColumn(sortOrder === 'desc' ? column : null);
			setFiles(sorted);
		}
	};

	return (
		<Modal open={open}>
			<div>
				<Header>
					<Title>
						<Folder color={theme.color} />
						<h1 style={{ width: 200 }}>File Directory</h1>
					</Title>
					<div>
						<XCircle
							color={theme.color}
							onClick={() => {
								setEditor(false);
								onClose();
							}}
							style={{ cursor: 'pointer' }}
						/>
					</div>
				</Header>
				<Content>
					{editor && (
						<Sidebar>
							<CloseButton>
								<XCircle
									color={theme.color}
									onClick={() => setEditor(false)}
									style={{ cursor: 'pointer' }}
								/>
							</CloseButton>
							<form autoComplete="off">
								<div
									style={{
										display: 'flex',
										flexDirection: 'column',
										alignItems: 'flex-start',
									}}
								>
									<p style={{ marginBottom: 5 }}>Title</p>
									<Input
										value={title}
										type="text"
										placeholder="Enter title"
										onChange={(e) => setTitle(e.target.value)}
									/>
								</div>
								<div
									style={{
										display: 'flex',
										flexDirection: 'column',
										alignItems: 'flex-start',
									}}
								>
									<p style={{ marginBottom: 5 }}>Content</p>
									<Textarea
										value={body}
										onChange={(e) => setBody(e.target.value)}
										placeholder="Enter content"
										rows={10}
									/>
								</div>
								<div
									style={{
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'flex-end',
										width: 'calc(100% - 15px)',
										gap: 10,
									}}
								>
									{rowId && (
										<Button
											text="Delete"
											onClick={remove}
											disabled={!title || !body}
											backgroundColor={theme.secondary}
										/>
									)}
									<Button
										text="Save"
										type="submit"
										onClick={(e) => save(e)}
										disabled={!title || !body}
										backgroundColor={theme.primary}
									/>
								</div>
							</form>
						</Sidebar>
					)}
					<Files editor={editor} hasFiles={files.length > 0}>
						<AddFileWrapper>
							<Button
								width={50}
								text=""
								onClick={() => {
									setRowId(null);
									setEditor(true);
									setTitle('');
									setBody('');
								}}
								backgroundColor={theme.primary}
							>
								<Plus color={theme.color} />
							</Button>
						</AddFileWrapper>
						{files.length > 0 ? (
							<Table
								startingData={files}
								onRowClick={(row) => {
									setRowId(row.id);
									setEditor(true);
									setTitle(row.title);
									setBody(row.body);
								}}
								onSort={(id) => sortData(id)}
							/>
						) : (
							<EmptyState>
								<p>Nothing to show</p>
							</EmptyState>
						)}
					</Files>
				</Content>
			</div>
		</Modal>
	);
}

const Header = styled.div(({ theme }) => ({
	color: theme.color,
	width: '100%',
	fontSize: 24,
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
	height: 'calc(100% - 64px)',
}));

const Sidebar = styled.div({
	position: 'sticky',
	top: 0,
	height: '100%',
	width: '33%',
	padding: 10,
});

const Files = styled.div(
	({ editor, hasFiles }: { editor: boolean; hasFiles: boolean }) => ({
		maxHeight: '100%',
		flex: `0 1 ${editor ? 'calc(66% + 20px)' : '100%'}`,
		margin: '0 15px',
		overflow: hasFiles ? 'auto' : 'hidden',
	})
);

const CloseButton = styled.div({
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'flex-end',
	width: 'calc(100% - 15px)',
});

const Input = styled.input({
	width: 'calc(100% - 35px)',
	padding: 10,
	marginBottom: 20,
	borderRadius: 8,
});

const Textarea = styled.textarea({
	width: 'calc(100% - 35px)',
	padding: 10,
	resize: 'vertical',
	borderRadius: 8,
	marginBottom: 20,
});

const AddFileWrapper = styled.div({
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'flex-start',
	width: 'calc(100% - 15px)',
	marginBottom: 20,
	marginLeft: 15,
});

const EmptyState = styled.div({
	height: 600,
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
});

export default FileDirectory;
