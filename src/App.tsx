import './App.css';

import React, { useState } from 'react';

import {Timetable, EventModel, TimetableModel} from './components/Timetable'

import {millisFromDateString, MAX_FUTURE_DAYS, EVENTS} from './globals';
import { TimetableForm } from './components/TimetableForm';
import {NewTimetable} from './components/NewTimetable';

function App() {
// In the real world, here is where data would be loaded
	const signUpTime = millisFromDateString('January 9, 2023, 00:00:00'); // 00:00:00 important!!
	const allEvents: EventModel[] = [];
	const allDays = Array.from( new Array(MAX_FUTURE_DAYS), () => {return [];} );

	const loadedTimetableModel = new TimetableModel(signUpTime, 0, -1, allEvents, allDays);
	// const timetableModel = loadedTimetableModel;
	const [timetableModel, setTimetableModel] = useState(loadedTimetableModel);

	// timetableModel.addNewEvent(new EventModel(
	// 	'Work', 
	// 	'work', 
	// 	millisFromDateString('January 9, 2023, 09:00:00'),
	// 	millisFromDateString('January 9, 2023, 17:00:00'),
	// ));

	// timetableModel.addNewEvent(new EventModel(
	// 	'Meeting', 
	// 	'meeting', 
	// 	millisFromDateString('January 9, 2023, 13:00:00'),
	// 	millisFromDateString('January 9, 2023, 15:00:00'),
	// ));

	// timetableModel.addNewEvent(new EventModel(
	// 	'Appointment', 
	// 	'urgent', 
	// 	millisFromDateString('January 10, 2023, 9:00:00'),
	// 	millisFromDateString('January 10, 2023, 13:00:00'),
	// ));

	// timetableModel.addNewEvent(new EventModel(
	// 	'Work', 
	// 	'work', 
	// 	millisFromDateString('January 11, 2023, 9:00:00'),
	// 	millisFromDateString('January 11, 2023, 17:00:00'),
	// ));

	// timetableModel.addNewEvent(new EventModel(
	// 	'Bahamas', 
	// 	'holiday', 
	// 	millisFromDateString('January 12, 2023, 9:00:00'),
	// 	millisFromDateString('January 15, 2023, 17:00:00'),
	// ));

	const saveEventToModel = (event: EventModel): void => {
		const newTimetableModel = new TimetableModel(
			timetableModel.signUpTime,
			timetableModel.firstDateToDisplay,
			timetableModel.totalEvents,
			timetableModel.allEvents,
			timetableModel.allDays
		);
		newTimetableModel.addNewEvent(event);
		setTimetableModel(newTimetableModel);
	}

	return (
		<div className="App">
			<header className="App-header">
				My Daily Planner
			</header>
			{/* <div className='main-body'>
				<div className='timetable-form-wrapper'>
					<TimetableForm saveEventToModel={saveEventToModel} />
				</div>
				
				<div className='timetable-wrapper'>
					<Timetable timetableModel={timetableModel}/>
				</div>
			</div> */}
			<div style={{textAlign:'center'}}>
				<NewTimetable />
			</div>
			
		</div>
	);
}


export default App;
