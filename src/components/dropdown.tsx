import React, { ChangeEvent, FC, useState } from 'react';
import { IDropdownProps } from '../interfaces/interfaces';

const Dropdown: FC<IDropdownProps> = ({ options, onSelect }) => {
    const [selected, setSelected] = useState("");
    const handleSelect = (e: ChangeEvent<HTMLSelectElement>) => {
        const selectedOption = e.target.value;
        setSelected(selectedOption);
        onSelect(selectedOption);
    };

    return (
        <>
            <select onChange={handleSelect}>
            {options.map((option) => (
                <option key={option.value} value={option.value}>
                {option.text}
                </option>
            ))}
            </select>
        </>
    );
};

export default Dropdown;