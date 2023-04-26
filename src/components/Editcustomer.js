import React from 'react';
import { Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function Editcustomer(props) {

	const [open, setOpen] = React.useState(false);
	const [customer, setCustomer] = React.useState({ firstname: '', lastname: '', streetaddress: '', postcode: '', city: '', email: '', phone: '' });

	const handleClickOpen = () => {
		console.log(props.customer);
		setOpen(true);
		setCustomer({
			firstname: props.customer.firstname,
            lastname: props.customer.lastname,
            streetaddress: props.customer.streetaddress,
            postcode: props.customer.postcode,
            city: props.customer.city,
            email: props.customer.email,
			phone: props.customer.phone
		})
	}

	const handleClose = () => {
		setOpen(false);
	}

	const handleInputChange = (event) => {
		setCustomer({ ...customer, [event.target.name]: event.target.value })
	}

	const updateCustomer = () => {
		props.updateCustomer(customer, props.customer.links[1].href);
		handleClose();
	}

	return (
		<div>
			<Button variant="outlined" color="primary" onClick={handleClickOpen}>
				Edit
			</Button>
			<Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
				<DialogTitle id="form-dialog-title">Edit customer</DialogTitle>
				<DialogContent>
				<TextField
						autoFocus
						margin="dense"
						name="firstname"
						value={customer.firstname}
						onChange={e => handleInputChange(e)}
						label="First name"
						fullWidth
					/>
					<TextField
						autoFocus
						margin="dense"
						name="lastname"
						value={customer.lastname}
						onChange={e => handleInputChange(e)}
						label="Last name"
						fullWidth
					/>
					<TextField
						autoFocus
						margin="dense"
						name="streetaddress"
						value={customer.streetaddress}
						onChange={e => handleInputChange(e)}
						label="Street address"
						fullWidth
					/>
					<TextField
						autoFocus
						margin="dense"
						name="postcode"
						value={customer.postcode}
						onChange={e => handleInputChange(e)}
						label="Postcode"
						fullWidth
					/>
					<TextField
						autoFocus
						margin="dense"
						name="city"
						value={customer.city}
						onChange={e => handleInputChange(e)}
						label="City"
						fullWidth
					/>
					<TextField
						autoFocus
						margin="dense"
						name="email"
						value={customer.email}
						onChange={e => handleInputChange(e)}
						label="Email"
						fullWidth
					/>
					<TextField
						autoFocus
						margin="dense"
						name="phone"
						value={customer.phone}
						onChange={e => handleInputChange(e)}
						label="Phone"
						fullWidth
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose} color="primary">
						Cancel
					</Button>
					<Button onClick={updateCustomer} color="primary">
						Edit
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}