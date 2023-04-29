import React from 'react';
import { Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { useState } from 'react';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

export default function Addactivity(props) {
	const [date, setDate] = useState(new Date().toISOString());
	const [open, setOpen] = React.useState(false);
	const [training, setTraining] = React.useState({ date: '', duration: '', activity: '', customer: '' });


	const handleClickOpen = () => {
		setTraining({ ...training, duration: '', customer: props.customer.links[0].href })
		setOpen(true);
	}

	const handleClose = () => {
		setOpen(false);
	}

	const handleInputChange = (event) => {
		setTraining({ ...training, [event.target.name]: event.target.value })
	}

	const saveTraining = () => {
		props.addTraining(training);
		handleClose();
	}

	const [selectedDate, handleDateChange] = useState(new Date());

	const ChangeDateFunc = (date) => {
		handleDateChange(date);
		const formatDate = date.toISOString();
		setTraining({ ...training, date: formatDate });
	}



	return (
		<div>
			<Button variant="outlined" color="primary" onClick={handleClickOpen}>
				Add a training
			</Button>
			<Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
				<DialogTitle id="form-dialog-title">Add training</DialogTitle>
				<DialogContent>
					<LocalizationProvider dateAdapter={AdapterDateFns}>
						<DateTimePicker
							label="Date"
							margin="dense"
							value={selectedDate}
							name="date"
							onChange={date => ChangeDateFunc(date)}
						/>
					</LocalizationProvider>
					<TextField
						autoFocus
						margin="dense"
						name="duration"
						value={training.duration}
						onChange={e => handleInputChange(e)}
						label="Duration"
						fullWidth
					/>
					<TextField
						autoFocus
						margin="dense"
						name="activity"
						value={training.activity}
						onChange={e => handleInputChange(e)}
						label="Activity"
						fullWidth
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose} color="primary">
						Cancel
					</Button>
					<Button onClick={saveTraining} color="primary">
						Save
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}