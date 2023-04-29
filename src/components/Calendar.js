import React, { useState, useEffect } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import fi from "date-fns/locale/fi";
import format from 'date-fns/format'
import parse from 'date-fns/parse'
import startOfWeek from 'date-fns/startOfWeek'
import getDay from 'date-fns/getDay'
import "react-big-calendar/lib/css/react-big-calendar.css";
import { addMinutes, parseISO, startOfDay, startOfHour } from "date-fns";

export default function TrainingsCalendar() {

	const [trainings, setTrainings] = useState([]);

    useEffect(() => {
        fetchTrainings();
    }, [])

	const fetchTrainings = () => {
        fetch('https://traineeapp.azurewebsites.net/gettrainings/')
        .then(response => response.json())
        .then((data => {
			 const TrainingEvents = data.map(training => ({
				start: parseISO(training.date),
				end: addMinutes(parseISO(training.date), training.duration),
				title: `${training.activity} / ${training.customer?.firstname} ${training.customer?.lastname}`

		}))
	
			setTrainings(TrainingEvents);
	}))
        .catch(err => console.error(err))
	
    };

	const locales = {
		'fi': fi,
	  }

	const localizer = dateFnsLocalizer({
		format,
		parse,
		startOfWeek,
		getDay,
		locales,
	  })

	return (
		<div>
    <Calendar
      localizer={localizer}
      events={trainings}
      startAccessor="start"
      endAccessor="end"
      style={{ height: 500 }}
    />
  </div>
	)

}