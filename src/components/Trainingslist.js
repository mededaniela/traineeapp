import React, { useState, useEffect, useRef } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import Addactivity from './Addactivity';
import { Button } from '@mui/material';

export default function Trainingslist() {
	const [trainings, setTrainings] = useState([]);
	const [trainingid, setId] = useState("id");

	const gridRef = useRef();

	useEffect(() => fetchData(), []);

	const fetchData = () => {
		fetch('https://traineeapp.azurewebsites.net/gettrainings/')
			.then(response => response.json())
			.then(data => setTrainings(data))
			.catch(err => console.error(err))
	};

	const saveTraining = (training) => {
		fetch("https://traineeapp.azurewebsites.net/api/trainings", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(training),
		})
			.then((response) => fetchData())
			.catch((err) => console.error(err));
	};

	const deleteTraining = (link) => {
		if (window.confirm("Are you sure?")) {
			fetch('https://traineeapp.azurewebsites.net/api/trainings/' + link,
				{ method: 'DELETE' })
				.then(response => fetchData())
				.catch(err => console.error(err))

		};
	};

	const columns = [
		{
			headerName: "Date", field: "date", sortable: true, filter: true, cellRenderer: (data) => {
				return data ? (new Date(data.value)).toLocaleString([], {
					year: 'numeric',
					month: '2-digit',
					day: '2-digit',
					hour: '2-digit',
					minute: '2-digit',
				}) : '';
			}
		},
		{ headerName: "Duration", field: "duration", sortable: true, filter: true },
		{ headerName: "Activity", field: "activity", sortable: true, filter: true },
		{ headerName: "Customer's first name", field: "customer.firstname", sortable: true, filter: true },
		{ headerName: "Customer's last name", field: "customer.lastname", sortable: true, filter: true },
		{
			width: 100,
			headerName: '',
			field: "id",
			cellRenderer: (params) => (
				<Button
					onClick={() => deleteTraining(params.value)}
					variant="contained"
					size="small"
					color="secondary"
				>
					Delete
				</Button>
			),
	},
	]


	return (
		<div>
			<Addactivity saveTraining={saveTraining} />
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
};