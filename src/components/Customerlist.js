import React, { useState, useEffect, useRef, useCallback } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import Addcustomer from './Addcustomer';
import Editcustomer from './Editcustomer';
import { Button } from '@mui/material';
import Addactivity from './Addactivity';
import CsvDownload from 'react-csv-downloader';

export default function Customerlist(props) {
	const [customers, setCustomers] = useState([]);

	const gridRef = useRef();

	useEffect(() => fetchData(), []);

	const fetchData = () => {
		fetch('https://traineeapp.azurewebsites.net/api/customers')
			.then(response => response.json())
			.then(data => setCustomers(data.content))
			.catch(err => console.error(err))
	}

	const CsvHeaders = [
		{ key: "firstname", label: "First name" },
		{ key: "lastname", label: "Last name" },
		{ key: "streetaddress", label: "Street address"},
		{ key: "postcode", label: "Postcode" },
		{ key: "city", label: "City" },
		{ key: "email", label: "Email"},
		{ key: "phone", label: "Phone"}
	]

	const CsvContent = customers.map((customer => ({
		firstname: customer.firstname,
		lastname: customer.lastname,
		streetaddress: customer.streetaddress,
		postcode: customer.postcode,
		city: customer.city,
		email: customer.email,
		phone: customer.phone
	})));


	const saveCustomer = (customer) => {
		fetch("https://traineeapp.azurewebsites.net/api/customers", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(customer),
		})
			.then((response) => fetchData())
			.catch((err) => console.error(err));
	};

	const deleteCustomer = (link) => {
		if (window.confirm("Are you sure?")) {
			fetch(link, { method: 'DELETE' })
				.then(res => fetchData())
				.catch(err => console.error(err))
		}
	}

	const updateCustomer = (customer, link) => {
		fetch(link, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(customer)
		})
			.then((response) => fetchData())
			.catch((err) => console.error(err));
	}

	function addTraining(training) {
		fetch('https://traineeapp.azurewebsites.net/api/trainings', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(training)
		})
			.then(res => fetchData())
			.catch(err => console.log(err))
	}



	const columns = [
		{ headerName: "First name", field: "firstname", sortable: true, filter: true },
		{ headerName: "Last name", field: "lastname", sortable: true, filter: true },
		{ headerName: "Street Address", field: "streetaddress", sortable: true, filter: true },
		{ headerName: "Postcode", field: "postcode", sortable: true, filter: true },
		{ headerName: "City", field: "city", sortable: true, filter: true },
		{ headerName: "Email", field: "email", sortable: true, filter: true },
		{ headerName: "Phone number", field: "phone", sortable: true, filter: true },
		{
			width: 100,
			cellRenderer: (link) => (
				<Editcustomer updateCustomer={updateCustomer} customer={link.data}
					variant="contained"
					color="secondary"
					size="small"
				>
					Edit
				</Editcustomer>
			),
		},
		{
			width: 100,
			cellRenderer: (link) => (
				<Button
					onClick={() => deleteCustomer(link.links[1].self.href)}
					variant="contained"
					color="secondary"
					size="small"
				>
					Delete
				</Button>
			),
		},
		{
			width: 100,
			cellRenderer: (link) => (
				<Addactivity addTraining={addTraining} customer={link.data}
					variant="contained"
					color="secondary"
					size="small"
				>
					Add training
				</Addactivity>
			),
		}
	]


	return (
		<div>
			<Addcustomer saveCustomer={saveCustomer} />

			<button className="btn download-report-btn">
			<CsvDownload 
			datas={CsvContent}
			separator=', '
			headers={CsvHeaders}
			filename="Customerlist">Download Report</CsvDownload>
			</button>

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