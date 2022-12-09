import * as React from 'react';

interface Row {
	id: number;
	title: string;
	body: string;
	date: Date;
}
interface TableProps {
	startingData: Row[];
	onRowClick: (row: Row) => void;
	onSort: (id: number) => void;
}
function Table({ startingData, onSort, onRowClick }: TableProps) {
	return <div></div>;
}

export default Table;
