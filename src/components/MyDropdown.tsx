import React, {useState} from 'react';

import Dropdown from 'react-bootstrap/Dropdown';

import {COLORS} from './../globals';

// Could have used "Selects".........
export function MyDropdown( props: {
        defaultText: string, 
        menuItems: Array<string>,
        className?: string
    }): JSX.Element {

    const [dropdownText, changeDropdownText] = useState(props.defaultText);
    const toggleId = Symbol().toString();

    const handleEventTypeSelected = (selectedItem: string) => {
        if (document.getElementById(toggleId)) {
            changeDropdownText(selectedItem);
        } else {
            console.warn("Could not find element with id " + toggleId);
        }
    }

    const dropdownMenuItems = props.menuItems.map((item) => {
        return (
            <Dropdown.Item
                key={item}
                onClick={() => handleEventTypeSelected(item)}>
                {item}
            </Dropdown.Item>
        );
    })

    return (
        <Dropdown className={props.className ? props.className : ''}>
            <Dropdown.Toggle id={toggleId}>
                {dropdownText}
            </Dropdown.Toggle>
            <Dropdown.Menu>
                {dropdownMenuItems}
            </Dropdown.Menu>
        </Dropdown>
    );
}

export default MyDropdown;