import * as React from 'react';
import Modal from '../common/modal';

interface FileDirectoryProps {
	open: boolean;
}

function FileDirectory({ open }: FileDirectoryProps) {
	return (
		<Modal open={open}>
			<div>
				<h1>File directory</h1>
			</div>
		</Modal>
	);
}

export default FileDirectory;
