
import './TimetableForm.css';

import React, {useState} from 'react';

import {EventModel} from './Timetable'

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
// import Dropdown from 'react-bootstrap/Dropdown';
// import MyDropdown from './MyDropdown';

import {EVENTS} from './../globals';

export function TimetableForm(props: {saveEventToModel: Function}): JSX.Element {

    // const dropdownMenuItemNames = Object.keys(EVENTS).map((event) => {
    //     return EVENTS[event as keyof typeof EVENTS].name;
    // });

    const eventKeysArray = Object.keys(EVENTS);
    const dropdownMenuItemNames = eventKeysArray.map((event, index) => {
        const eventName: string = EVENTS[event as keyof typeof EVENTS].name;
        return (
            <option key={index}>{eventName}</option>
        );
    });

    
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    
    const handleSubmit = () => {
        try {
            const name = (document.getElementById("form-event-name")! as HTMLInputElement).value;
            const typeName = (document.getElementById("form-event-type")! as HTMLInputElement).value;
            const type = eventKeysArray.find(key => EVENTS[key as keyof typeof EVENTS].name === typeName);
            const newEvent = new EventModel(name, type as keyof typeof EVENTS, startDate.getTime(), endDate.getTime());
            props.saveEventToModel(newEvent);
        }
        catch(error) {
            console.warn(error);
        }
        
    }


    return (
        <div>
            <Card className='timetable-form'>
                <Form>
                    <div className='title mb-3'>Save Event</div>

                    {/* <Form.Group className="mb-3" controlId="form-event-name"> */}
                        <Form.Control className="mb-3" id="form-event-name" type="text" placeholder="Event name"/>
                    {/* </Form.Group> */}

                    {/* <Form.Group className="mb-3"> */}
                        {/* <MyDropdown 
                            defaultText='Select event type'
                            menuItems={dropdownMenuItemNames}
                        /> */}
                        <Form.Select className="mb-3" id="form-event-type">
                            <option>Select event type</option>
                            {dropdownMenuItemNames}
                        </Form.Select>

                    {/* <MyDatePicker id="form-start-datepicker" />
                    <MyDatePicker id="form-end-datepicker" /> */}
                    <DatePicker 
                        id="form-start-datepicker"
                        selected={startDate} 
                        onChange={(date:Date) => setStartDate(date)} 
                        showTimeSelect
                        dateFormat="Pp"
                    />
                    <DatePicker 
                        id="form-end-datepicker"
                        selected={endDate} 
                        onChange={(date:Date) => setEndDate(date)} 
                        showTimeSelect
                        dateFormat="Pp"
                    />
                    

                    {/* <Form.Group className="mb-3">
                        <Form.Control className="mb-3" id="form-start-time" type="text" placeholder="Start time"/>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <DatePicker id="form-end-datepicker" showTimeSelect selected={new Date()} onChange={() => {return;}} />
                        <Form.Control className="mb-3" id="form--time" type="text" placeholder="Start time"/>
                    </Form.Group>

                        
                    <Form.Control className="mb-3" id="form-end-time" type="text" placeholder="End time"/> */}
                        {/* <Form.Group className="mb-3" controlId="form-end-time">
                            <Form.Label>End Time</Form.Label>
                            <Form.Control type="text" />
                        </Form.Group> */}

                    <Button variant="primary" type="button" onClick={handleSubmit}>
                        Submit
                    </Button>
                </Form>
            </Card>
        </div>
    );
}

const MyDatePicker = (props: {id:string}) => {
    const [startDate, setStartDate] = useState(new Date());
    return (
        <DatePicker 
            id={props.id} 
            selected={startDate} 
            onChange={(date:Date) => setStartDate(date)} 
            showTimeSelect
            dateFormat="Pp"
        />
    );
  };

// 'Work', 
// 'standard', 
// millisFromDateString('January 11, 2023, 9:00:00'),
// millisFromDateString('January 11, 2023, 17:00:00'),