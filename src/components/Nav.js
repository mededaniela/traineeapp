import React, { useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Customerlist from './Customerlist';
import Trainingslist from './Trainingslist';
import TrainingsCalendar from './Calendar';


function Nav() {
	const [value, setValue] = useState('home');

	const handleChange = (event, value) => {
		setValue(value);
	};


	return (<div>
		<Tabs value={value} onChange={handleChange}>
			<Tab value="home" label="Home" />
			<Tab value="customerlist" label="Customer list" />
			<Tab value="trainingslist" label="Trainings list" />
			<Tab value="calendar" label="Calendar" />
		</Tabs>
		{value === 'home' && <div>Hello! This is the home page of Trainee App.</div>}
		{value === 'customerlist' && <div><Customerlist /></div>}
		{value === 'trainingslist' && <div><Trainingslist /></div>}
		{value === 'calendar' && <div><TrainingsCalendar /></div>}
	</div>);
}

export default Nav;
