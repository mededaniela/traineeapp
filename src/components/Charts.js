import React, { useState } from "react";
import lodash from 'lodash';
import { BarChart, XAxis, YAxis, Bar } from "recharts";

export default function TrainingCharts() {
const [trainings, setTrainings] = useState([]);

React.useEffect(() => {
	fetchData();
}, []);


	function fetchData() {
        fetch('https://traineeapp.azurewebsites.net/gettrainings/')
            .then(response => response.json())
            .then(responseData => {
                setTrainings(lodash(responseData)
                    .groupBy(trainings => trainings.activity)
                    .map((value, key) => (
                        {activity: key, totalamount: lodash.sumBy(value, 'duration')}
                    ))
                    .value());
            })
    }

	return (
		<div>
            <BarChart width={1000} height={400} data={trainings}>
                <XAxis dataKey="activity"/>
                <YAxis label={{value: 'Duration (min)', angle: 90, position: 'insideLeft'}}/>
                <Bar dataKey="totalamount" fill="#49d157"/>
            </BarChart>
        </div>
	)
}