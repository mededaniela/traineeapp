import React, { useState, useEffect, useRef } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import moment from 'moment/moment';

export default function Trainingslist() {
	const [trainings, setTrainings] = useState([]);

	const gridRef = useRef();

	useEffect(() => fetchData(), []);

	const fetchData = () => {
		fetch('http://traineeapp.azurewebsites.net/gettrainings')
			.then(response => response.json())
			.then(data => setTrainings(data))
			.catch(err => console.error(err))
	}

	const columns = [
		{
			headerName: "Date", field: "date", sortable: true, filter: true, valueFormatter: function dateFormatter(params) {
				return moment(params.value).format('DD/MM/YYYY HH:mm');
			}
		},
		{ headerName: "Duration", field: "duration", sortable: true, filter: true },
		{ headerName: "Activity", field: "activity", sortable: true, filter: true },
		{ headerName: "Customer's first name", field: "customer.firstname", sortable: true, filter: true },
		{ headerName: "Customer's last name", field: "customer.lastname", sortable: true, filter: true }
	]


	return (
		<div>
			<div className="ag-theme-material"
				style={{ height: '700px', width: '70%', margin: 'auto' }} >
				<AgGridReact
					ref={gridRef}
					onGridReady={params => gridRef.current = params.api}
					rowSelection="single"
					columnDefs={columns}
					rowData={trainings}
					animateRows={true}>
				</AgGridReact>
			</div>
		</div>
	);
}