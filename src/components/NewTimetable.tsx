import './NewTimetable.css';

import React, { useEffect, useRef, useState } from 'react';
import {EVENTS, DAYS_OF_WEEK} from './../globals';
// import {EventModel, TimetableModel} from './components/Timetable'


// function NewTimetable(props: {
//     className?: string,
//     allEvents: Array<EventModel>, 
//     allDays: Array<number>
// }): JSX.Element {
export function NewTimetable(props: {
    className?: string, 

        }): JSX.Element {
    const TIMETABLE_ID = "timetable-container-id-" + (new Date()).getTime();
    const testDatesArray = DAYS_OF_WEEK.SHORT;


    const ref = useRef(null) as any;
  
    // const [height, setHeight] = useState(0);
    const [childWidth, setWidth] = useState(0);

    const columns = Array(8).fill(null).map((val, index) => {
        const dayOfWeekIndex = index % 7;
        const timeIndicator = (index === 0);
        return (
            <NewTimetableCol 
                key={index}
                timeIndicator={timeIndicator}
                day={timeIndicator ? '\xa0' : DAYS_OF_WEEK.LONG[dayOfWeekIndex]} 
                width={childWidth} 
            />
        );
    });

    useEffect(() => {
        const parentWidth = ref.current.offsetWidth;
        console.log("parentWidth: " + parentWidth);
        setWidth(parentWidth/7.5 - 1);
      }, []);
    
    return (
        <div ref={ref} id={TIMETABLE_ID} className={'new-timetable-container ' + props.className}>
            {columns}
        </div>
    );
}

function NewTimetableCol(props: {timeIndicator?: boolean, day: string, width: number}): JSX.Element {
    // const eventStartTime = 8

    const ASPECT_RATIO = 0.7;
    const height = props.width * ASPECT_RATIO; // deal with ratio here.
    if (props.width === 0) return <div/>

    if (props.timeIndicator) {
        console.log('time indic');
    }

    const headerFontSize = (props.width / 120) + 'rem';
    const headerOffset = height/3;

    // console.log("received child width of " + props.width);
    // console.log("lineHeight is " + headerOffset);

    let lines = Array(49).fill(null).map((val, index) => {
        const newHeight = index * height / 3;
        // console.log('new/Height: ' + newHeight);
        if (props.timeIndicator) {
            return (
                <div key={index} className='new-timetable-time-indicator'
                    style={{
                        // top:'calc(' + (newHeight + headerOffset)  + 'px - 12px)',
                            top:'calc(' + (1*(newHeight + headerOffset))  + 'px - ' + (0.4*height/3) + 'px)',
                            width: props.width/2,
                            height: height / 3,
                            fontSize:'calc(' + headerFontSize + '*0.9)'
                        }}>
                            <div>
                    {/* <div style={{height:height / 3, position:"absolute", top:'50%', transform:'translateY(-50%)', msTransform:'translateY(-50%)'}}> */}
                        {Math.floor(index/2) + ':' + (3 * (index%2)) + '0'}
                    </div>
                    
                </div>
            );
        } else {
            return (
                <div 
                    key={index}
                    className={props.timeIndicator ? 'new-timetable-time-indicator' : 'new-timetable-row-line'}
                    style={props.timeIndicator ? {
                        // top:'calc(' + (newHeight + headerOffset)  + 'px - 12px)',
                            top:'calc(' + (1*(newHeight + headerOffset))  + 'px + 0px)',
                            width: props.width/2,
                            height: height / 3,
                        } : {
                            top:newHeight + headerOffset,
                            width: props.width,
                            background:(index%2===0) ? 'gray' : 'lightgrey'
                        }}>
                    {props.timeIndicator ? Math.floor(index/2) + ':' + (3 * (index%2)) + '0' : ''}
                </div>
                );
        }
    });
    



    return (
        <div className='new-timetable-col-wrapper' style={{width:props.timeIndicator ? props.width/2 : props.width}}>
            {/* <div style={{position:'fixed'}}> */}
            {/* <div className='new-timetable-col-header'>
                {props.day}
            </div>
            <div className='new-timetable-col-body'>
                {lines}
            </div> */}
            <div style={{
                lineHeight:headerOffset+'px',
                fontSize:headerFontSize
            }}>
                {props.day}
            </div>
            {lines}
        </div>
        
    );
}

// export default NewTimetable;