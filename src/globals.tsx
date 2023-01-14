
export const MAX_FUTURE_DAYS = 365;

// export const EVENTS =  [['standard', 'Standard'], 
//                         ['meeting', 'Meeting'], 
//                         ['urgent', 'Urgent'], 
//                         ['holiday', 'Holiday']];

// export const EVENTS = {
//     'standard-event': 'Standard', 
//     'meeting-event': 'Meeting', 
//     'urgent-event': 'Urgent', 
//     'holiday-event': 'Holiday'};
                        
export const EVENTS = {
    work: {
        name: "Work",
        color: "#00ccff"
    },
    meeting: {
        name: "Meeting",
        color: "#ffcc66"
    },
    urgent: {
        name: "Urgent",
        color: "#cc66ff"
    },
    holiday: {
        name: "Holiday",
        color: "#66ff66"
    }
};
                        
export const COLORS = {
    DEFAULT: '#f2f2f2',
    PRIMARY: '#61dafb',
}

export const DAYS_OF_WEEK = {
    SHORT: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    LONG: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
}

export function millisFromDateString(dateString: string): number {
    const date: Date = new Date(dateString);
    return date[Symbol.toPrimitive]("number"); // use getUTCTime() instead?
};

export function millisFromDate(date: Date): number {
    return date[Symbol.toPrimitive]("number");
};