import React, { useState, useEffect, useRef } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';

export default function Customerlist(props) {
	const [customers, setCustomers] = useState([]);

	const gridRef = useRef();

	useEffect(() => fetchData(), []);

	const fetchData = () => {
		fetch('https://traineeapp.azurewebsites.net/api/customers')
			.then(response => response.json())
			.then(data => setCustomers(data.content))
			.then(data => props.setTrainings(data.content.data._links.trainings.href))
			.catch(err => console.error(err))
	}

	const columns = [
		{ headerName: "First name", field: "firstname", sortable: true, filter: true },
		{ headerName: "Last name", field: "lastname", sortable: true, filter: true },
		{ headerName: "Street Address", field: "streetaddress", sortable: true, filter: true },
		{ headerName: "Postcode", field: "postcode", sortable: true, filter: true },
		{ headerName: "City", field: "city", sortable: true, filter: true },
		{ headerName: "Email", field: "email", sortable: true, filter: true },
		{ headerName: "Phone number", field: "phone", sortable: true, filter: true }
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
					rowData={customers}
					animateRows={true}>
				</AgGridReact>
			</div>
		</div>
	);
}