import './Timetable.css';

import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';

import {EVENTS} from './../globals';

export class TimetableModel {
    signUpTime: number;
    firstDateToDisplay: number;
    totalEvents: number;
    allEvents: Array<EventModel>;
    allDays: Array<Array<number>>;
    
    constructor(signUpTime: number,
                firstDateToDisplay: number,
                totalEvents: number,
                allEvents: Array<EventModel>,
                allDays: Array<Array<number>>) { // Maybe Array<Set<number>> better?
        this.signUpTime = signUpTime;
        this.firstDateToDisplay = firstDateToDisplay; // As index from signUpTime
        this.totalEvents = totalEvents;
        this.allEvents = allEvents;
        this.allDays = allDays;
    }

    addNewEvent(Event: EventModel) {
        const id = ++this.totalEvents;
        Event.id = id;
        this.allEvents.push(Event);
        const startIndex = EventHelper.findTimeAsIndex(Event.startTime, this.signUpTime);
        const endIndex = EventHelper.findTimeAsIndex(Event.endTime, this.signUpTime);
        // console.log("For id: " + id + ", startIndex = " + startIndex + " and endIndex = " + endIndex);
        for (let i = startIndex; i <= endIndex; i++) {
            this.allDays[i].push(id);
        }
    }
}

export class EventModel {
    name: string;
    type: keyof typeof EVENTS;
    startTime: number;
    endTime: number;
    id: number = -1;

    constructor(name: string, 
                type: keyof typeof EVENTS, 
                startTime: number, 
                endTime: number,
                id?: number) {
        if (id) this.id = id;
        this.name = name;
        this.type = type;
        this.startTime = startTime;
        this.endTime = endTime;
    }
}

abstract class EventHelper {
    static millisInADay = 86400000;
    static daysOfWeekAsStrings = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    //TODO some more testing
    static findTimeAsIndex(time: number, signUpTime: number): number {
        const timeDifference = time - signUpTime;
        const days = Math.floor(timeDifference / this.millisInADay);
        // console.log("days: " + days);
        return days;
    }

    static findDateStringFromDayIndex(dayIndex: number, signUpTime: number): string {
        const millisSinceSignUp = dayIndex * this.millisInADay; 
        const date = new Date(signUpTime + millisSinceSignUp);
        // console.log("found date for string calculation: " + date);
        return "" + this.daysOfWeekAsStrings[date.getDay()] + ", " + date.getDate() + "/" + (date.getMonth()+1);
    }

    static getMinutesOnDayFromMillis(millis: number): number {
        const date = new Date(millis);
        const minuteInDay = date.getHours() * 60 + date.getMinutes();
        // console.log("Dealing with Date: " + date);
        // console.log("minutes on day according to Date: " + minuteInDay);
        return minuteInDay;
    }
}

/**
 * Timetable slot
 */
function TTSlot(props:{timeSlot: EventModel}): JSX.Element {
    console.log("TTSLOT timeSlot: " + JSON.stringify(props.timeSlot));
    if (!props.timeSlot) 
        return (<div className='ttslot'></div>)
    else
        return(
            <div 
                className={'ttslot ' + props.timeSlot.type}
                style={{backgroundColor: EVENTS[props.timeSlot.type].color}}>
                {props.timeSlot.name}
            </div>
        )
}

function TimeMarkerColumn(): JSX.Element {

    const timeIndicators = Array(24).fill(null).map((val, index) => {
        return (
            <li key={index} className='ttslot time-marker'>
                {"" + index + ":00"}
            </li>
        );
    });

    return (
        <ol className='ttcolumn timemarker-column'>
            {timeIndicators}    
            {/* {timeIndicators.splice(5, timeIndicators.length)} */}
        </ol>
    )
}

/**
 * Timetable column
 */
function TTColumn(props: {events: Array<EventModel>, dateIndex: number, signUpTime: number}) {
    // logObject(props);
    const timeSlots = Array(24).fill(null);
    // for (let i = 0; i < 24; i++) {
    //     values[i] = i;
    // }

    props.events.forEach((event) => {
        const startTimeInMinutes = EventHelper.getMinutesOnDayFromMillis(event.startTime);
        const endTimeInMinutes = EventHelper.getMinutesOnDayFromMillis(event.endTime);
        const startTimeInHours = Math.floor(startTimeInMinutes / 60);
        const endTimeInHours = Math.floor(endTimeInMinutes / 60);
        // a lot of work can be done here to optimise and make things clearer!!!!
        let startAt = startTimeInHours;
        if (props.dateIndex > EventHelper.findTimeAsIndex(event.startTime, props.signUpTime))
            startAt = 0;

        let goUpUntil = endTimeInHours;
        if (props.dateIndex < EventHelper.findTimeAsIndex(event.endTime, props.signUpTime))
            goUpUntil = 24;

        for (let i = startAt; i < goUpUntil; i++) {
            timeSlots[i] = event;
        }        
    });


    // const slots = timeSlots.splice(5, timeSlots.length).map((timeSlot, index) => {
    const slots = timeSlots.map((timeSlot, index) => {
        return(
            <li key={index}>
                <TTSlot timeSlot={timeSlot} />
            </li>
        );
    });

    return (
        <ol className='ttcolumn'>
            {EventHelper.findDateStringFromDayIndex(props.dateIndex, props.signUpTime)}
            {slots}
        </ol>
    )
}

export function Timetable(props: {timetableModel: TimetableModel}): JSX.Element {
    if (!props) {
        console.warn("empty props at Timetable");
        // return null;
    }

    const firstDateToDisplay = props.timetableModel.firstDateToDisplay;
    const daysToDisplay = props.timetableModel.allDays.slice(firstDateToDisplay, firstDateToDisplay+7);
    const timetableColumns = daysToDisplay.map((events, index) => {
        const eventsOnDay: Array<EventModel> = events.map((eventID, i) => {
            return props.timetableModel.allEvents[eventID];
        });

        return (
            <li key={index}>
                <TTColumn 
                    events={eventsOnDay}
                    dateIndex={firstDateToDisplay + index}
                    signUpTime={props.timetableModel.signUpTime}
                    // dateAsString={EventHelper.findDateStringFromDayIndex(index, props.timetableModel.signUpTime)}
                    // Can move this into TTColumn to keep this component cleaner
                />
            </li>
        );
    });

    return (
        <div className='timetable'>
            <Card className='timetable-card'>
                <ol className='timetable-table'>
                    <TimeMarkerColumn />
                    {timetableColumns}
                </ol>
            </Card>
        </div>
    )
}